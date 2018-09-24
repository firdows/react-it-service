import React, { Component } from "react";
import PropTypes from "prop-types";
class SearchBar extends Component {
    //รบคำ props และกำหนด state ผำน  constructor เปนอกรปแบบหนง
    constructor(props) {
        super(props);
        this.state = { term: "" }
    }
    //รปแบบกำรกำหนด PropTypes เพอเชค props ทสงเขำมำ
    static propTypes = {
        onSearchTermChange: PropTypes.func.isRequired,
        placeholder: PropTypes.string
    }
    render() {
        return (
            <input
                className="form-control"
                placeholder={this.props.placeholder}
                value={this.state.term}
                onChange={e => this.onInputChange(e.target.value)} />
        )
    }
    //ฟงกชนสำหรบเรยก props ทใช filter ขอมล
    //ดงนนฟงกชน onSearchTermChange ทสงเขำมำตองเปนฟงกชนทใชในกำร filter ขอมล
    //Component นทำหนำทเพยงสงตวอกษรกลบไป
    onInputChange(term) {
        this.setState({ term });
        this.props.onSearchTermChange(term);
    }
}
export default SearchBar;