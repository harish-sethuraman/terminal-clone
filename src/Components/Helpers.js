import React from 'react';

class FileNode {
  constructor(name, parent) {
    this.name = name;
    this.parent = parent;
    this.children = [];
  }
}

export const createNode = (name, parent) => new FileNode(name, parent);

const rootNode = createNode('~', null);

export let currentNode = rootNode;

const cdToChild = (args, fromRoot) => {
  let found = false;
  fromRoot.children.forEach((node) => {
    if (node.name === args) {
      currentNode = node;
      found = true;
    }
  });
  if (found) {
    return [`moved to ${args}`];
  }
  return [`No Folder named ${args}`];
};

const executeCd = (args) => {
  if (args === '..') {
    if (currentNode === rootNode) {
      return ['Already in parent folder'];
    }
    currentNode = currentNode.parent;
    return ['moved to parent'];
  }
  if (args[0] === '~') {
    const dirs = args.split('/').slice(1);
    currentNode = rootNode;
    dirs.forEach((string) => cdToChild(string, currentNode));
    return [`moved to ${currentNode.name}`];
  }
  if (args[0] === '.') {
    const dirs = args.split('/').slice(1);
    dirs.forEach((string) => cdToChild(string, currentNode));
    return [`moved to ${currentNode.name}`];
  }
  return cdToChild(args, currentNode);
  // return [`moved to ${currentNode.name}`];
};

const pwd = (root, target, visited) => {
  if (root === null) {
    return false;
  }
  visited.push(root);
  if (root === target) {
    return true;
  }
  for (const node of root.children) {
    pwd(node, target, visited);
    return true;
  }
  visited.pop();

  return false;
};
export const executeCommand = (command, args) => {
  switch (command) {
    case 'cd':
      return executeCd(args);
    case 'mkdir':
      if (args.trim() === '') {
        return ['Enter a valid Folder name'];
      }
      currentNode.children.push(createNode(args.trim(), currentNode));
      return [`created ${args}`];
    case 'ls':
      return currentNode.children.length === 0
        ? ['No Folders found']
        : currentNode.children;
    case 'pwd':
      const visited = [];
      pwd(rootNode, currentNode, visited);
      return [visited.map((node) => node.name).join('/')];
    case 'help':
      return ['Welcome to Strek\'s Iterm. Here are some commands you can play around with', 'mkdir - to create a folder', 'cd - to move around', 'ls - to list the contents', 'pwd - to find current path', 'More to come'];
    default:
      if (command.trim() === '') {
        return ['Valid commands are mkdir,cd,ls,pwd'];
      }
      return ['command not found'];
  }
};
