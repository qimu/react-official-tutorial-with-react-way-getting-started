import React from 'react/addons';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

class CommentBox extends React.Component {
	constructor() {
		super();
		this.state = {
			data: [
				{
					"id": 1388534400000,
					"author": "Pete Hunt",
					"text": "Hey there!"
				},
				{
					"id": 1420070400000,
					"author": "Paul O’Shannessy",
					"text": "React is *great*!"
				},
				{
					"id": 1471539922464,
					"author": "aaaa",
					"text": "bbbb"
				},
				{
					"id": 1471660011286,
					"author": "324",
					"text": "123"
				},
				{
					"id": 1471660026781,
					"author": "aa",
					"text": "bb"
				}
			]
		}
	}
	loadCommentsFromServer() {
		// $.ajax({
		// 	url: this.props.url,
		// 	dataType: 'json',
		// 	cache: false,
		// 	success: function(data) {
		// 		this.setState({data: data});
		// 	}.bind(this),
		// 	error: function() {
		// 		console.error(this.props.url, status, err.toString());
		// 	}.bind(this)
		// });
	}
	componentDidMount() {
		this.loadCommentsFromServer();
		// setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	}
	handleCommentSubmit(comment) {
		// var comments = this.state.data;
		// var newComments = comments.concat([comment]);
		// $.ajax({
		// 	url: this.props.url,
		// 	dataType: 'json',
		// 	type: 'POST',
		// 	data: comment,
		// 	success: function(data) {
		// 		this.setState({data: newComments});
		// 	}.bind(this),
		// 	error: function(xhr, status, err) {
		// 		console.error(this.props.url, status, err.toString());
		// 	}.bind(this)
		// })
	}
	render() {
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList data={this.state.data} />
			</div>
		);
	}
	//				//
	// <CommentForm onCommentSubmit={this.handleCommentSubmit} />
}


export default CommentBox;
