import React from 'react';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Create Shuffle 1on1
                </p>
            </header>
            <MemberInput />
        </div>
    );
}

class MemberInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            memberInputCount: 4,
            members: [],
        };
    }

    onClickAddMember() {
        this.setState({ memberInputCount: this.state.memberInputCount + 1 });
    }

    onClickDeleteMember(i) {
        const members = document.getElementById("members");
        members.removeChild(document.getElementById("member" + i));
    }

    onClickCreatePair() {
        const membersDiv = document.getElementById("members").children;
        let membersValue = [];
        for (let i = 0; i < membersDiv.length; i++) {
            const name = membersDiv[i].getElementsByTagName("input")[0].value;
            membersValue.push(name);
        }
        this.setState({ members: membersValue });
    }

    renderMember() {
        const content = [];
        for (let i = 0; i < this.state.memberInputCount; i++) {
            content.push((<div id={"member" + i}>
                <input type="text" />
                <button onClick={() => this.onClickDeleteMember(i)}>delete</button>
            </div>));
        }
        return content;
    }

    renderPairs() {
        var n = this.state.members.length;
        var row = [...Array(n)].map((_, i) => i + 1); //=> [ 1, 2, 3, 4..., n]
        var matrixArray = [];
        matrixArray.push((<tr>
            <th scope="col"></th>
            {this.state.members.map((m) => {
            return (
                <th scope="col">{m}</th>
            );
            })}
        </tr>));

        for (var i = 0; i < n; i++) {
            var rowi = row.slice(i, n).concat(row.slice(0, i));
            rowi.splice(i, 1, '-');
            matrixArray.push(<tr>
                <th scope="row">{this.state.members[i]}</th>
                {rowi.map((value, column) => {
                    return <Pair
                        row={i}
                        column={column}
                        value={value}
                    />;
                })}
            </tr>);
        }
        return matrixArray;
    }

    render() {
        return (
            <>
                <div className="input-area">
                    <h2>Input Members' Name</h2>
                    <div id="members">
                        {this.renderMember()}
                    </div>
                    <button onClick={() => this.onClickAddMember()}>add member</button>
                    <p></p>
                    <button onClick={() => this.onClickCreatePair()}>create 1on1 pair</button>
                </div>
                <div className="pair-area">
                    <p></p>
                    <h2>Shuffle 1on1 Schedule</h2>
                    <p>Click unnecessary pairs. Then you can change status.</p>
                    <table id="pair-table">{this.renderPairs()}</table>
                </div>
            </>
        );
    }
}

class Pair extends React.Component {
    onClickTd(props) {
        if (props.row == props.column) {
            return;
        }

        var cell = document.getElementById("td_" + props.row + "_" + props.column);
        var reverse = document.getElementById("td_" + props.column + "_" + props.row);

        if (cell.innerText == '-') {
            cell.innerText = props.value;
            reverse.innerText = props.value;
        } else {
            cell.innerText = '-';
            reverse.innerText = '-';
        }
    }

    render() {
        return (
            <td id={"td_" + this.props.row + "_" + this.props.column}  onClick={() => this.onClickTd(this.props)}>{this.props.value}</td>
         );
    }
}

export default App;
