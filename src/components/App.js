import React, {Component, useState} from "react";
import '../styles/App.css';

const App = () => {

        const [name1, setName1] = useState('');
        const [name2, setName2] = useState('');
        const [result, setResult] = useState('');
        
        const calculateRelationship = () => {
            if (!name1 || !name2) {
              setResult('Please Enter valid input');
              return;
            }
        
            const countLetters = (str) => {
              return str.split('').reduce((count, char) => {
                count[char] = (count[char] || 0) + 1;
                return count;
              }, {});
            };
        
            const name1Letters = countLetters(name1);
            const name2Letters = countLetters(name2);
        
            for (let char in name1Letters) {
              if (name2Letters[char]) {
                const minCount = Math.min(name1Letters[char], name2Letters[char]);
                name1Letters[char] -= minCount;
                name2Letters[char] -= minCount;
              }
            }
        
            const remainingLettersCount = Object.values(name1Letters).reduce((a, b) => a + b, 0) +
                                          Object.values(name2Letters).reduce((a, b) => a + b, 0);
        
            const relationship = ['Siblings', 'Friends', 'Love', 'Affection', 'Marriage', 'Enemy'];
            const resultIndex = remainingLettersCount % 6;
            setResult(relationship[resultIndex]);
          };
        
          const clearInputs = () => {
            setName1('');
            setName2('');
            setResult('');
          };
        
        return(
            <div id="main">
              <input type="text" placeholder="Enter first name" value={name1} onChange={(e) => setName1(e.target.value)} data-testid="input2" />
                <input
                    type="text"
                    placeholder="Enter second name"
                    value={name2}
                    onChange={(e) => setName2(e.target.value)}
                    data-testid="input2"
                />
                <button onClick={calculateRelationship} data-testid="calculate_relationship">
                    Calculate Relationship Future
                </button>
                <button onClick={clearInputs} data-testid="clear">
                    Clear
                </button>
                <h3 data-testid="answer">{result}</h3>
            </div>
        )
}


export default App;
