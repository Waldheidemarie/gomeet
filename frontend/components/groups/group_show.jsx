import React from 'react';
import { Link } from 'react-router-dom';

class GroupShow extends React.Component {
  componentDidMount() {
    this.props.fetchGroup(this.props.match.params.groupId);
    this.joinGroup = this.joinGroup.bind(this);
    this.leaveGroup = this.leaveGroup.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.group.id != this.props.group.id) {
      this.props.fetchGroup(this.props.match.params.groupId);
    }
  }

  joinGroup(e) {
    e.preventDefault();
    this.props.joinGroup(this.props.group.id);
  }

  leaveGroup(e) {
    e.preventDefault();
    this.props.leaveGroup(this.props.group.id);
  }

  render() {
    if ((!this.props.group) || (!this.props.creator)) {
      return null;
    }

    const creator = this.props.creator;
    let button;

    if ((this.props.currentUser) && (this.props.currentUser.id === this.props.group.creator_id)) {
      button = <Link to={`/groups/${this.props.group.id}/manage`} className='group-show-button'>Manage</Link>;
    } else if ((this.props.currentUser) && (!this.props.group.members.includes(this.props.currentUser.id))) {
      button = <button onClick={this.joinGroup}>Join this group</button>;
    } else if (this.props.currentUser) {
      button = <button onClick={this.leaveGroup}>Leave this group</button>;
    } else {
      button = <Link to='/login' className='group-show-button'>Join this group</Link>;
    }

    let photo;
    if (this.props.group && this.props.group.photo) {
      photo = <img src={this.props.group.photo} />
    }

    let avatar;
    if (creator && creator.photo) {
      avatar = <img src={creator.photo} />
    }

    return (
      <div className='group-show-page'>
        <div className='group-show-header'>
          <div>
            {photo}
          </div>
          <div className='group-show-header-text'>
            <h1>{this.props.group.title}</h1>
            <div>
              <i className="fas fa-map-marker-alt"></i>
              <div> New York, NY</div>
            </div>
            <div>
              <i className="fas fa-user-friends"></i>
              <div>[] members</div>
            </div>
            <div>
              <i className="fas fa-user-alt"></i>
              <div>Organized by <div>{ creator.name}</div></div>
            </div>
          </div>
        </div>
          <div className='group-show-stripe'>
            <div className='about-events'>
              <div>About</div>
              <div>Events</div>
            </div>
            <div>
              {/* <button>{button}</button>  */}
              {button}
            </div>
          </div>
        <div className='group-show-bottom'>
          <div className='group-show-right'>
            <div className='group-show-main'>
              <div className='group-show-description'>
                <h2>What we're about</h2>
                <div>{this.props.group.description}</div>
              </div>
              <div className='group-show-events-'>
                <div className='group-show-events-header'>
                  <h3>Upcoming events</h3>
                  <button>See all</button>
                </div>
                <div>
                  events will go here
                </div>
              </div>
            </div>
          </div>
          <div className='group-show-left'>
            <div className='group-org'>
              <h3>Organizer</h3>
              <div>
                <div>{avatar}</div>
                <div>{creator.name}</div>
              </div>
            </div>
            <div className='group-show-members'>
              <h3>Members</h3>
              <div>
                member avatars will go here
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GroupShow;
