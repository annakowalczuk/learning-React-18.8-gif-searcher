Search = React.createClass({
    getInitialState() {
        return {
          searchingText: ''
        };
    },
    
    handleChange: function(event) {
        var searchingText = event.target.value;
        this.setState({
            searchingText: searchingText
        });
    },

    handleSubmit: function(event) {
        this.props.onSubmit(this.state.searchingText);
        event.preventDefault();
    },

    render: function() {
        var styles = {
            fontSize: '1.5em',
            width: '90%',
            maxWidth: '350px'
        };

        return (
                <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    onChange={this.handleChange}
                    placeholder="Tutaj wpisz wyszukiwaną frazę"
                    style={styles}
                    value={this.state.searchTerm}
                />
                </form>
        );
    }
});