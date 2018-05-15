App = React.createClass({
	getInitialState() {
		return {
			loading: false,
			searchingText: '',
			gif: {}
		};
	},

	getGif: function(searchingText) {
		return new Promise(function(resolve, reject) {
			const url = 'http://api.giphy.com/v1/gifs/random?api_key=A85frT4qePLNPjpPflLsTvOW3eynO1ds&tag=' + searchingText;
			const xhr = new XMLHttpRequest();
			xhr.onload = function() {
				if (xhr.status === 200) {
					const data = JSON.parse(xhr.responseText).data;
					const gif = {
						url: data.fixed_width_downsampled_url,
						sourceUrl: data.url
					};
					resolve(gif);
				} else {
					reject(Error(xhr.statusText));
				}
			};
			xhr.open('GET', url);
			xhr.send();
		});
	},

	handleSearch: function(searchingText) {
		this.setState({
			loading: true
		});
		this.getGif(searchingText).then(function(gif) {
			this.setState({
				loading: false,
				gif: gif,
				searchingText: searchingText
			});
		}.bind(this))
			.catch(function(error) {
				console.log(error);}
      .bind(this));
	},

	render: function() {
		const styles = {
			margin: '0 auto',
			textAlign: 'center',
			width: '90%'
		};

		return ( <
			div style={styles}>
			<h1>Gif search!</h1>
			<p>Find gif on <a href = 'http://giphy.com'>giphy</a>. Press Enter to upload next gif.</p>
			<Search onSearch={this.handleSearch}/>
			<Gif loading={this.state.loading}
			url={this.state.gif.url}
			sourceUrl={this.state.gif.sourceUrl}/>
			</div>
		);
	}
});