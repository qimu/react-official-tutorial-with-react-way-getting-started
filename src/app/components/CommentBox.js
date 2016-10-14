import React from 'react/addons';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import $ from 'jquery';

class CommentBox extends React.Component {
	constructor() {
		super();
		this.state = {
			data: []
		}
	}
	loadCommentsFromServer() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function() {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	}
	componentDidMount() {
		this.loadCommentsFromServer();
		setInterval(this.loadCommentsFromServer.bind(this), 1000);
	}
	handleCommentSubmit(comment) {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			type: 'POST',
			data: comment,
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		})
	}
	render() {
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList data={this.state.data} />
				<CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
			</div>
		);
	}
}


// Prop types validation
CommentBox.propTypes = {
	url: React.PropTypes.string.isRequired
};

export default CommentBox;
