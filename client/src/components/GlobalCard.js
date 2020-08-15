import React from 'react'; 

export default class GlobalCard extends React.Component {
    state = {
        loading: true,
        world: null
    }; 

    async componentDidMount() {
        const api = "https://corona.azure-api.net/all";
        const response = await fetch(api);
        const data = await response.json();

        console.log(data)
        
        this.setState({ world: data[0], loading: false});
    }
    render() {
        return (
            <>
            <div>
                {this.state.loading || !this.state.world ? (
                    <div>Loading...</div>
                ):(
                    <div class="row stats-container text-center">
                        <div class="col-6 card">
                            <h5 class="section">Global Stats
                            </h5>
                            <div class="row global-container">
                                <div class="col-6">
                                    <h6>Cumulative</h6>
                                    <p class="badge badge-primary">Confirmed: {this.state.world.globalData.Confirmed.toLocaleString()}
                                    </p>
                                    <p class="badge badge-warning">Active: {this.state.world.globalData.Active.toLocaleString()}
                                    </p>
                                    <p class="badge badge-danger">Deaths: {this.state.world.globalData.Deaths.toLocaleString()}
                                    </p>
                                    <p class="badge badge-success">Recovered: {this.state.world.globalData.Recovered.toLocaleString()}
                                    </p>
                                    <br></br>
                                </div>
                                <div class="col-6">
                                    <h6>Daily</h6>
                                    <p class="badge badge-warning">New Cases: {this.state.world.globalData.NewConfirmed.toLocaleString()}</p>
                                    <p class="badge badge-danger">New Deaths: {this.state.world.globalData.NewDeaths.toLocaleString()}
                                    </p>
                                    <p class="badge badge-success">New Recovered: {this.state.world.globalData.NewRecovered.toLocaleString()}
                                    </p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                
                )}
            </div>
            </>
        )
    
    }
}