import React from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Col from 'react-bootstrap/lib/Col';
import Label from 'react-bootstrap/lib/Label';
import {injectIntl, FormattedMessage} from 'react-intl';
import OverviewMap from '../../components/OverviewMap';
import Icon from '../../utils/Icon';
import {hasFullscreenMapPlugin, getHearingURL} from '../../utils/hearing';
import AutoAffix from 'react-overlays/lib/AutoAffix';
import Row from 'react-bootstrap/lib/Row';
import getAttr from '../../utils/getAttr';
import keys from 'lodash/keys';
import {setLanguage} from '../../actions';
import ContactCard from '../../components/ContactCard';
import SubSectionListGroup from '../../components/SubSectionListGroup';
import {Link} from 'react-router';
import config from '../../config';

class Sidebar extends React.Component {

  // constructor(props) {
  //   super(props);
  //
  //   this.state = {mouseOnSidebar: false, scrollPosition: []};
  //   this.handleScroll = this.handleScroll.bind(this);
  // }


  // componentDidMount() {
  //   window.addEventListener('scroll', this.handleScroll);
  // }
  //
  // componentWillUnmount() {
  //   window.removeEventListener('scroll', this.handleScroll);
  // }
  //
  // handleScroll(event) {
  //   if (this.state.mouseOnSidebar) {
  //     event.preventDefault();
  //     window.scroll(...this.state.scrollPosition);
  //   }
  // }

  getCommentsItem() {
    const {hearing, mainSection, currentlyViewed, isQuestionView} = this.props;
    const showPluginInline = !mainSection.plugin_fullscreen;
    if (mainSection.n_comments === 0 || !showPluginInline) {
      return null;
    }

    if (isQuestionView) {
      return (
        <Link to={getHearingURL(hearing)}>
          <ListGroupItem className={currentlyViewed === '#hearing-comments' && 'active'} href="#hearing-comments">
            <FormattedMessage id="comments"/>
            <div className="comment-icon">
              <Icon name="comment-o"/>&nbsp;{mainSection.n_comments}
            </div>
          </ListGroupItem>
        </Link>
      );
    }

    return (
      <ListGroupItem className={currentlyViewed === '#hearing-comments' && 'active'} href="#hearing-comments">
        <FormattedMessage id="comments"/>
        <div className="comment-icon">
          <Icon name="comment-o"/>&nbsp;{mainSection.n_comments}
        </div>
      </ListGroupItem>
    );
  }

  getFullscreenItem() {
    const {hearing, mainSection} = this.props;
    const fullscreen = hasFullscreenMapPlugin(hearing);
    if (!fullscreen) {
      return null;
    }
    const fullscreenURL = getHearingURL(hearing, {fullscreen: true});
    return (
      <ListGroupItem href={fullscreenURL}>
        <FormattedMessage id="commentsOnMap"/>
        <div className="comment-icon">
          <Icon name="comment-o"/>&nbsp;{mainSection.n_comments}
        </div>
      </ListGroupItem>
    );
  }

  getLanguageChanger() {
    const {hearing, dispatch, activeLanguage} = this.props;
    const availableLanguages = { fi: 'Kuuleminen Suomeksi', sv: 'Enkäten på svenska', en: 'Questionnaire in English'};
    const languageOptionsArray = keys(hearing.title).map((lang, index) => {
      if (getAttr(hearing.title, lang, {exact: true}) && lang === activeLanguage) {
        return (<div className="language-link-active">
          {availableLanguages[lang]}
        </div>);
      }

      if (getAttr(hearing.title, lang, {exact: true}) &&
        keys(hearing.title).filter((key) => key === activeLanguage).length === 0 &&
        index === 0) {
        return (<div className="language-link-active">
          {availableLanguages[lang]}
        </div>);
      }

      if (getAttr(hearing.title, lang, {exact: true})) {
        return (<div className="language-link">
          <a onClick={(event) => { event.preventDefault(); dispatch(setLanguage(lang)); }} href="" >
            {availableLanguages[lang]}
          </a>
        </div>);
      }

      return null;
    });

    if (languageOptionsArray.length > 1) {
      return languageOptionsArray;
    }

    return null;
  }

  getSectionList() {
    const {
      hearing,
      sectionGroups,
      currentlyViewed,
      isQuestionView,
      activeLanguage} = this.props;
    return (
      <ListGroup>
        {isQuestionView ?
          <Link to={getHearingURL(hearing)}>
            <ListGroupItem className={currentlyViewed === '#hearing' && 'active'} href="#hearing">
              <FormattedMessage id="hearing"/>
            </ListGroupItem>
          </Link>
          : <ListGroupItem className={currentlyViewed === '#hearing' && 'active'} href="#hearing">
            <FormattedMessage id="hearing"/>
          </ListGroupItem>}
        {sectionGroups.map((sectionGroup) => (
          !isQuestionView ?
            <ListGroupItem
              className={currentlyViewed === '#hearing-sectiongroup' + sectionGroup.name_singular && 'active'}
              href={"#hearing-sectiongroup-" + sectionGroup.type}
              key={sectionGroup.name_singular + Math.random()}
            >
              {getAttr(sectionGroup.name_plural, activeLanguage)}
              <div className="comment-icon"><Icon name="comment-o"/>&nbsp;{sectionGroup.n_comments}</div>
              <SubSectionListGroup
                sections={sectionGroup.sections}
                hearing={hearing}
              />
            </ListGroupItem> :
            <Link
              className="active-group-link"
              to={getHearingURL(hearing) + '#hearing-sectiongroup-' + sectionGroup.type}
            >
              <ListGroupItem
                className={currentlyViewed === '#hearing-sectiongroup' + sectionGroup.name_singular && 'active'}
                key={sectionGroup.name_singular + Math.random()}
              >
                {getAttr(sectionGroup.name_plural, activeLanguage)}
                <div className="comment-icon"><Icon name="comment-o"/>&nbsp;{sectionGroup.n_comments}</div>
                <SubSectionListGroup
                  currentlyViewed={currentlyViewed}
                  sections={sectionGroup.sections}
                  hearing={hearing}
                />
              </ListGroupItem>
            </Link>
        ))}
        {this.getFullscreenItem()}
        {this.getCommentsItem()}
      </ListGroup>
    );
  }

  render() {
    const {hearing, hearingSlug} = this.props;
    const TOP_OFFSET = 75;
    const BOTTOM_OFFSET = 165;
    const boroughDiv = (hearing.borough ? (<div>
      <h4><FormattedMessage id="borough"/></h4>
      <Label>{hearing.borough}</Label>
    </div>) : null);
    const hearingMap = (hearing.geojson ? (<div className="sidebar-section map">
      <h4><FormattedMessage id="overview-map"/></h4>
      <OverviewMap hearings={[hearing]} style={{width: '100%', height: '200px'}} hideIfEmpty />
    </div>) : null);
    const reportUrl = config.apiBaseUrl + "/v1/hearing/" + hearingSlug + '/report';
    return (<Col md={4} lg={3}>
      <AutoAffix viewportOffsetTop={TOP_OFFSET} offsetBottom={BOTTOM_OFFSET} container={this.parentNode}>
        <div
             className="hearing-sidebar"
             style={window.innerWidth >= 992 && {maxHeight: window.innerHeight - TOP_OFFSET}}
             /* onMouseEnter={() =>
             { this.setState({mouseOnSidebar: true, scrollPosition: [window.pageXOffset, window.pageYOffset]}); }} */
             /* onMouseLeave={() =>
             { this.setState({mouseOnSidebar: false}); }} */
        >
          <Row>
            <Col sm={6} md={12} style={{ marginBottom: 20 }}>
              {this.getLanguageChanger()}
            </Col>
            <Col sm={6} md={12}>
              <div className="sidebar-section contents">
                <h4><FormattedMessage id="table-of-content"/></h4>
                {this.getSectionList()}
              </div>
            </Col>
            <Col sm={6} md={12}>
              {Object.keys(hearing.borough).length !== 0 && boroughDiv}
              {hearingMap}
            </Col>
            {hearing.contact_persons &&
              <Col sm={12}>
                <div className="sidebar-section further-info">
                  <h4><FormattedMessage id="furtherInformation"/></h4>
                  <div className="flex">
                    {hearing.contact_persons.map((person, index) =>
                      <ContactCard key={index} {...person}/>  // eslint-disable-line react/no-array-index-key
                    )}
                  </div>
                  <a href={reportUrl} className="btn btn-default btn-sm" style={{ whiteSpace: 'normal' }}><Icon name="download"/> <FormattedMessage id="downloadReport"/></a>
                </div>
              </Col>
            }
          </Row>
        </div>
      </AutoAffix>
    </Col>);
  }
}

Sidebar.propTypes = {
  hearing: React.PropTypes.object,
  mainSection: React.PropTypes.object,
  sectionGroups: React.PropTypes.array,
  activeLanguage: React.PropTypes.string,
  dispatch: React.PropTypes.func,
  currentlyViewed: React.PropTypes.string,
  isQuestionView: React.PropTypes.func,
  hearingSlug: React.PropTypes.string,
};

export default injectIntl(Sidebar);
