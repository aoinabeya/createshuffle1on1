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
        const members = document.getElementById("members-area");
        members.removeChild(document.getElementById("member" + i));
    }

    onClickCreatePair() {
        const pairAreaDiv = document.getElementById("pair-area");
        pairAreaDiv.hidden = false;
        const membersDiv = document.getElementById("members-area").children;
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
            content.push((<div id={"member" + i} className="members" key={i}>
                <input type="text" />
                <button onClick={() => this.onClickDeleteMember(i)}>削除</button>
            </div>));
        }
        return content;
    }

    renderPairs() {
        var n = this.state.members.length;
        var row = [...Array(n)].map((_, i) => i + 1); //=> [ 1, 2, 3, 4..., n]
        var matrixArray = [];
        matrixArray.push((<tr key="header">
            <th scope="col"></th>
            {this.state.members.map((m, index) => {
            return (
                <th scope="col" key={m + index}>{m}</th>
            );
            })}
        </tr>));

        for (let i = 0; i < n; i++) {
            var rowi = row.slice(i, n).concat(row.slice(0, i));
            rowi.splice(i, 1, '-');
            matrixArray.push(<tr key={"tr" + i}>
                <th scope="row" key={"th" + i}>{this.state.members[i]}</th>
                {rowi.map((value, column) => {
                    return <Pair
                        row={i}
                        column={column}
                        value={value}
                        key={"Pair" + i + "_" + column}
                    />;
                })}
            </tr>);
        }
        return matrixArray;
    }

    render() {
        return (
            <div className="main">
                <div id="input-area">
                    <h2>面談するメンバーの名前を入力してください</h2>
                    <div id="members-area" className="members">
                        {this.renderMember()}
                    </div>
                    <button onClick={() => this.onClickAddMember()}>追加</button>
                    <p></p>
                    <button onClick={() => this.onClickCreatePair()}>スケジュールを作成</button>
                </div>
                <div id="pair-area" hidden={true}>
                    <p></p>
                    <h2>シャッフル1on1のスケジュール</h2>
                    <p>面談対象でない組み合わせをクリックしてください。表示が「-」に切り替わります。</p>
                    <table id="pair-table"><tbody>{this.renderPairs()}</tbody></table>
                </div>
            </div>
        );
    }
}

class Pair extends React.Component {
    onClickTd(props) {
        if (props.row === props.column) {
            return;
        }

        var cell = document.getElementById("td_" + props.row + "_" + props.column);
        var reverse = document.getElementById("td_" + props.column + "_" + props.row);

        if (cell.innerText === '-') {
            cell.innerText = props.value;
            reverse.innerText = props.value;
        } else {
            cell.innerText = '-';
            reverse.innerText = '-';
        }
    }

    render() {
        return (
            <td id={"td_" + this.props.row + "_" + this.props.column} onClick={() => this.onClickTd(this.props)} key={"td"+this.props.row + "_" + this.props.column}>{this.props.value}</td>
         );
    }
}

export default App;
