import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { currentNode, executeCommand } from "./Helpers";
import { useHotkeys, useIsHotkeyPressed } from "react-hotkeys-hook";
import CascadiaCode from "./CascadiaCode.woff2";

const AppWrapper = styled.div`
  background: black;
  color: white;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}px` : "14px")};
  @font-face {
    font-family: "'Cascadia Code',Menlo, Monaco, 'Courier New', monospace";
    src: local("'Cascadia Code',Menlo, Monaco, 'Courier New', monospace"),
      local("'Cascadia Code',Menlo, Monaco, 'Courier New', monospace"),
      url(${CascadiaCode}) format("woff2"), url(${CascadiaCode}) format("woff");
    font-weight: 300;
    font-style: normal;
  }
`;

const InputForm = styled.input`
  top: 0;
  left: 0;
  background-color: black;
  width: 100px;
  color: white;
  opacity: 0;
`;

const CurrentCommand = styled.div`
  color: #50fa7b;
  display: flex;
  font-family: "Cascadia Code", Menlo, Monaco, "Courier New", monospace;
`;

const CurrentNode = styled.div`
  color: #50fa7b;
  font-family: "Cascadia Code", Menlo, Monaco, "Courier New", monospace;
`;
const Cursor = styled.div`
  background: lime;
  line-height: 17px;
  margin-left: 3px;
  animation: blink 0.8s infinite;
  width: 7px;
  height: ${(props) => (props.fontSize ? `${props.fontSize}px` : "18px")};

  @keyframes blink {
    0% {
      background: #222;
    }
    50% {
      background: lime;
    }
    100% {
      background: #222;
    }
  }
`;

const OutputResult = styled.div`
  margin-top: 5px;
  color: ${(props) => (props.color % 3 === 1 ? "#50fa7b" : "#8be9fd")};
  ${(props) => (props.color % 3 === 2 ? "margin-bottom : 30px" : null)};
  font-family: "Cascadia Code", Menlo, Monaco, "Courier New", monospace;
`;

const TerminalForm = styled.form`
  height: 0;
  width: 0;
`;

const App = () => {
  const inputField = useRef();
  const cursorRef = useRef();

  const [output, setOutput] = useState([]);

  const [outputs, setOutputs] = useState([
    `Welcome to Strek's Iterm.`,
    " use help command to know commands.",
    "supports basic commands like cmd + k to clear screen, cmd + + to increase font, cmd + - to decrease font size",
  ]);
  useEffect(() => {
    //   executeCommand('mkdir','1')
    //   executeCommand('cd','1')
    //   executeCommand('mkdir','2')
    //   executeCommand('cd','2')
    //   executeCommand('cd','..')
    // executeCommand('cd','..')
    inputField.current.focus();
    cursorRef.current.scrollIntoView();
  }, [outputs]);

  const [itermCommand, setCommand] = useState("");

  const [fontSize, setFontSize] = useState(14);

  const runCommand = (e) => {
    e.preventDefault();
    const [command, args] = itermCommand.split(" ");
    const commandOutput = executeCommand(command, args);
    setOutput(commandOutput);
    setOutputs((prevOutputs) => [
      ...prevOutputs,
      currentNode.name,
      `=> ${itermCommand}`,
      ...commandOutput,
    ]);
    setCommand("");
    console.log(cursorRef.current);
  };

  useHotkeys(
    "command.=",
    (event, handler) => {
      event.preventDefault();
      setFontSize((prevState) => prevState + 1);
    },
    {
      enableOnTags: ["INPUT", "TEXTAREA", "SELECT"],
      splitKey: ".",
    },
    []
  );

  useHotkeys(
    "command.-",
    (event, handler) => {
      event.preventDefault();
      setFontSize((prevState) => prevState - 1);
    },
    {
      enableOnTags: ["INPUT", "TEXTAREA", "SELECT"],
      splitKey: ".",
    },
    []
  );

  useHotkeys(
    "command+k",
    (event, handler) => {
      event.preventDefault();
      console.log(handler.key, event);
      setOutputs([]);
    },
    {
      enableOnTags: ["INPUT", "TEXTAREA", "SELECT"],
      splitKey: "+",
    },
    []
  );

  return (
    <AppWrapper onClick={() => inputField.current.focus()} fontSize={fontSize}>
      {outputs.map((node, index) =>
        node.name ? (
          <OutputResult color={index}>{node.name}</OutputResult>
        ) : (
          <OutputResult color={index}>{node}</OutputResult>
        )
      )}
      <TerminalForm onSubmit={(e) => runCommand(e)}>
        <InputForm
          ref={inputField}
          value={itermCommand}
          onChange={(e) => setCommand(e.target.value)}
        />
        <button type="submit" hidden />
      </TerminalForm>
      <CurrentNode>{executeCommand("pwd")}</CurrentNode>
      <CurrentCommand>
        mac@strek => {itermCommand}
        <Cursor ref={cursorRef} fontSize={fontSize}></Cursor>
      </CurrentCommand>
    </AppWrapper>
  );
};

export default App;
