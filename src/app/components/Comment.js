import React from 'react/addons';
import Remarkable from 'remarkable';

class Comment extends React.Component {
	rawMarkup() {
		var md = new Remarkable();
		var rawMarkup = md.render(this.props.children.toString());
		return { __html: rawMarkup };
	}
	render() {
		//console.log(this.rawMarkup());
		return (
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>
				<span dangerouslySetInnerHTML={this.rawMarkup()} />
			</div>
		)
	}
}


export default Comment;
