import React, {Component} from 'react'
import ReactTable from "react-table"
import matchSorter from 'match-sorter'
import 'react-table/react-table.css'

class SongTable extends Component {
  render() {
    return (
      <ReactTable
        data={this.props.data}
        filterable
        columns={[
          {
            Header: "Music Database",
            columns: [
              {
                Header: "Artist",
                accessor: "artist",
                filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["artist"] }),
                filterAll: true
              },
              {
                Header: "Album",
                accessor: "album",
                filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["album"] }),
                filterAll: true
              },
              {
                Header: "Song",
                accessor: "song",
                filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["title"] }),
                filterAll: true
              }
            ]
          }
        ]}
        defaultPageSize={10}
        className="-striped -highlight"
      />
    )
  }
}

export default SongTable
