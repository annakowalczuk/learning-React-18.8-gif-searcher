var GIPHY_API_URL = 'https://api.giphy.com';
var GIPHY_PUB_KEY = 'PQ4s7mwFM6CzE61MpIu4Mced1Mu1uZJm';

App = React.createClass({
    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },

    handleSearch: function(searchingText) {  // Pobierz na wejściu wpisywany tekst.
        this.setState({
          loading: true  // Zasygnalizuj, że zaczął się proces ładowania.
        });
        this.getGif(searchingText)
            .then(response => this.setState({  
                loading: false,  // przestań sygnalizować ładowanie
                gif: response,  // ustaw nowego gifa z wyniku pobierania,
                searchingText: searchingText  // ustaw nowy stan dla wyszukiwanego tekstu.
              }))
            .catch(error => console.log(error));
      },
    
    getGif: function(searchingText) {
        return new Promise(
          function (resolve, reject) {
            var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  // Konstruujemy adres URL dla API Giphy.
            var xhr = new XMLHttpRequest();  // Wywołujemy całą sekwencję tworzenia zapytania XHR do serwera i wysyłamy je.
            xhr.open('GET', url);
            xhr.onload = function() {
              if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText).data; // W obiekcie odpowiedzi mamy obiekt z danymi. W tym miejscu rozpakowujemy je sobie do zmiennej data, aby nie pisać za każdym razem response.data.
                    resolve({  // Układamy obiekt gif na podstawie tego, co otrzymaliśmy z serwera.
                        url: data.fixed_width_downsampled_url,
                        sourceUrl: data.url
                    });
                } else {
                    reject(xhr.status); // failure
                }
            }
            xhr.send();
            }
        );
    },  
    
    render: function() {

        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
          <div style={styles}>
                <h1>Wyszukiwarka GIFow!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search onSubmit={this.handleSearch}/>
                <Gif
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                />
          </div>
        );
    }
});