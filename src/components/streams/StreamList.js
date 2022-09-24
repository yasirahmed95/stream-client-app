import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStreams } from "../../actions";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    if (this.props.isSignedIn) {
      if (stream.userId === this.props.currentUserId) {
        return (
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <Link to={`/streams/edit/${stream.id}`} className="btn btn-primary">
              Edit
            </Link>
            <Link
              to={`/streams/delete/${stream.id}`}
              className="btn btn-danger"
            >
              Delete
            </Link>
          </div>
        );
      }
    }
  }

  renderList() {
    return this.props.streams.map((stream) => {
      return (
        <div
          className="list-group-item d-flex justify-content-between align-items-start"
          key={stream.id}
        >
          <i className="bi bi-camera-video fs-3"></i>
          <div className="ms-3 me-auto">
            <div className="fw-bold">
              <Link to={`/streams/${stream.id}`} className="link-primary">
                {stream.title}
              </Link>
            </div>
            <div>{stream.description}</div>
          </div>
          {this.renderAdmin(stream)}
        </div>
      );
    });
  }

  renderCreateButton() {
    if (this.props.isSignedIn) {
      return (
        <div className="float-end mt-2">
          <Link className="btn btn-primary" to="/streams/new">
            Create Stream
          </Link>
        </div>
      );
    }
  }

  render() {
    //console.log(this.streams);
    return (
      <div>
        <h2>Streams</h2>
        <div className="list-group">{this.renderList()}</div>
        {this.renderCreateButton()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
