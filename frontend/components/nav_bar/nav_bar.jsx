import React from 'react';
import { Image, Transformation } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import UserMenu from './user_menu';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, true);
  }

  componentWillUnmount() {
    const main = document.querySelector('main');

    main.style.paddingTop = 0;
    window.removeEventListener('scroll', this.handleScroll, true);
  }

  toggleModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  handleScroll() {
    const main = document.querySelector('main');
    const nav = document.querySelector('.dashboard-nav');
    const topOfNav = nav.offsetTop;
    window.nav = nav;

    if (window.scrollY >= topOfNav) {
      main.style.paddingTop = nav.offsetHeight + 'px';
      nav.classList.add('fixed-nav');
    } else {
      main.style.paddingTop = 0;
      nav.classList.remove('fixed-nav');
    }
  }

  render() {
    const { currentUser, logout } = this.props;

    const getParent = () => {
      return document.querySelector('#nav-bar-avatar');
    };

    return (
      <div className="dashboard-nav">
        <Link to="/home">
          <Image publicId="shuttr_logo_name.png"
            cloudName="shuttr"
            className="logo"
          />
        </Link>

        <div className="user-buttons">
          <Link to="/photos/upload">
            <i className="fa fa-cloud-upload" aria-hidden="true"></i>
          </Link>

          <a id="nav-bar-avatar" onClick={this.toggleModal}>
            <Image publicId={currentUser.img_url}
              cloudName="shuttr"
              >
              <Transformation height="100" width="100" crop="thumb" />
            </Image>
          </a>

          <Modal
            isOpen={this.state.modalIsOpen}
            contentLabel="NavBar Modal"
            onRequestClose={this.toggleModal}
            parentSelector={getParent}
            className={{
              base: 'user-menu-modal'
            }}
            overlayClassName={{
              base: 'user-menu-overlay'
            }}
            >

            <UserMenu
              currentUser={ this.props.currentUser }
              logout={this.props.logout}
              toggleModal={this.toggleModal}
            />
          </Modal>
        </div>
      </div>
    );
  }
}

export default NavBar;
