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

        // if (searchingText.length > 2) {
        //     this.props.onSearch(searchingText);
        //   }
    },

    handleSubmit: function(event) {
        this.props.onSubmit(this.state.searchingText);
        event.preventDefault();
    },

    handleKeyUp: function(event) {
        //Czy wciśnięty klawisz to enter?
        if (event.keyCode === 13) { 
          this.props.onSearch(this.state.searchingText);
        }
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
                    onKeyUp={this.handleKeyUp}
                    placeholder="Tutaj wpisz wyszukiwaną frazę"
                    style={styles}
                    value={this.state.searchTerm}
                />
                <input type="submit" value="Submit" />
                </form>
        );
    }
});