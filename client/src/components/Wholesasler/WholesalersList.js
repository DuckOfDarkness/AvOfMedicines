import React from "react";
import {Link} from "react-router-dom";
import {getWholesalerApiCall} from "../../apiCalls/Wholesaler/wholesalerApiCalls";
import WholesalerListTable from "../Tables/Wholesaler/WholesalerListTable";


class WholesalersList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            wholesaler: []
        }
    }

    componentDidMount() {
        this.fetchWholesalerList()
    }

    fetchWholesalerList = () => {
        getWholesalerApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        wholesaler: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const {error, isLoaded, wholesaler} = this.state
        let content

        if(error){
            content = <p>Błąd: {error.message}</p>
        } else if(!isLoaded) {
            content = <p>Ładowaie danych hurtowni...</p>
        }else{
            content = <WholesalerListTable wholeList = {wholesaler} />
        }

        return (
            <main>
                <h2>Lista hurtowni</h2>
                <hr/>
                {content}
                <p>
                    <Link to="/wholesaler/add" className="button-add">Dodaj nową hurtownię</Link>
                </p>
            </main>
        )
    }
}

export default WholesalersList