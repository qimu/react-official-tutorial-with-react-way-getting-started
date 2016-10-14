import React from 'react/addons';
import Remarkable from 'remarkable';

class Comment extends React.Component {
	// rawMarkup() {
	// 	var md = new Remarkable();
	// 	var rawMarkup = md.render(this.props.children.toString());
	// 	return { __html: rawMarkup };
	// }
	render() {
		return (
			<div className="comment">
				<h1 className="commentAuthor">
					{this.props.author}
				</h1>
				<p>
					{this.props.children}
				</p>
				{/*<span dangerouslySetInnerHTML={this.rawMarkup()} />*/}
			</div>
		)
	}
}


export default Comment;
