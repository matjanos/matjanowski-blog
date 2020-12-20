import React from "react"

interface CommentsProps {
    issueNo: number
}

interface CommentsState {
    isLoaded: boolean,
    items: any[],
    error: any
}

interface IComment {
    body: string
    date: Date,
    authorName: string,
    authorUrl: string,
    avatarUrl: string
}

export default class Comments extends React.Component<CommentsProps, CommentsState> {
    issueNo: number;
    constructor(props) {
        super(props);
        console.log(props);
        this.issueNo = props.issueNo;
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch(`https://api.github.com/repos/octocat/hello-world/issues/${this.issueNo}/comments`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    renderComment(comment: IComment) {
        return <div>
            <img src={comment.avatarUrl} />
            <span><a href={comment.authorUrl}>{comment.authorName}</a></span>
            <span>{comment.date}</span>
            <span>{comment.body}</span>
        </div>
    }

    renderAllComments(items: any[]) {
        return items
            .map(i => {
                return {
                    body: i.body,
                    date: i.date,
                    authorName: i.user.login,
                    authorUrl: i.user.html_url,
                    avatarUrl: i.user.avatar_url,
                };
            })
            .map(c => this.renderComment(c));
    }

    render() {
        console.log(this.state);
        if (!this.state.isLoaded) {
            return <div>
                Loading...
                </div>
        }
        if (this.state.error) {
            <span>Error on getting comments: {this.state.error}</span>
        }
        if (this.state.items)
            if (!this.state.items.length) {
                return <div>
                    No comments in issuse {this.issueNo}.
                 </div>
            }
            else {
                return <div>{this.renderAllComments(this.state.items)}</div>
            }
    }
}