/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useCallback, useState, useRef} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Button,
  CheckBox,
  Text,
} from 'react-native';
import styles from './styles';
import {Grid, Position, Row, GridSlot} from './types';
import {COLS, ROWS} from './utils';
import Slot from './components/Slot';

const generateGrid = (randomize = false): Grid => {
  const grid: Grid = [];
  for (let i = 0; i < COLS; i++) {
    const row: Row = [];
    for (let j = 0; j < ROWS; j++) {
      row.push({
        value: randomize ? (Math.random() > 0.9 ? true : false) : false,
        id: `${i}-${j}`,
      });
    }
    grid.push(row);
  }
  return grid;
};

const options = [
  [0, 1],
  [1, 0],
  [1, 1],
  [-1, -1],
  [-1, 0],
  [0, -1],
  [-1, 1],
  [1, -1],
];

const App = () => {
  const [grid, setGrid] = useState<Grid>(generateGrid());
  const [running, setRunning] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1000);

  const runningRef = useRef(running);
  runningRef.current = running;

  const resetGrid = (): void => {
    setRunning(false);
    runningRef.current = false;
    setGrid(generateGrid());
  };

  const randomStart = (): void => {
    setGrid(generateGrid(true));
  };

  const handlePress = ({x, y}: Position) => {
    const gridCopy = [...grid];
    gridCopy[x][y].value = !gridCopy[x][y].value;
    setGrid(gridCopy);
  };

  const check = (x: number, y: number, gridCopy: Grid): Grid => {
    let neighbors = 0;
    for (let item of options) {
      const [xToAdd, yToAdd] = item;
      try {
        if (grid[x + xToAdd][y + yToAdd].value) {
          neighbors++;
        }
      } catch {}
    }

    if (gridCopy[x][y].value) {
      if (neighbors !== 2 && neighbors !== 3) {
        gridCopy[x][y].value = false;
      }
    } else {
      if (neighbors === 3) {
        gridCopy[x][y].value = true;
      }
    }
    return gridCopy;
  };

  const startGame = useCallback((): void => {
    if (!runningRef.current) return;
    let gridCopy = [...grid];
    for (let y = 0; y < COLS; y++) {
      for (let x = 0; x < ROWS; x++) {
        gridCopy = check(x, y, gridCopy);
      }
    }
    setGrid(gridCopy);
    setTimeout(startGame, speed);
  }, [running, grid, speed]);

  const handleGame = async (): Promise<void> => {
    if (running) {
      setRunning(false);
      runningRef.current = false;
      resetGrid();
    } else {
      setRunning(true);
      runningRef.current = true;
      startGame();
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.btns}>
        <Button title={running ? 'stop' : 'start'} onPress={handleGame} />
        <Button title="reset" onPress={resetGrid} />
        <Button title="random start" onPress={randomStart} />
      </View>
      <FlatList
        columnWrapperStyle={styles.list}
        st
        data={grid}
        numColumns={50}
        keyExtractor={(item, index) => item[index].id}
        //@ts-ignore
        renderItem={({item, index: x}: {item: Row}) => {
          return item.map(({value}: GridSlot, y: number) => (
            <Slot selected={value} onPress={() => handlePress({x, y})} />
          ));
        }}
      />
      <View style={styles.btns}>
        <Button
          title="speed up"
          onPress={() => {
            if (speed > 100) {
              setSpeed((prev) => prev - 100);
            }
          }}
        />
        <Text style={styles.speed}>{speed / 1000} secs </Text>
        <Button
          title="slow down"
          onPress={() => {
            setSpeed((prev) => prev + 100);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
