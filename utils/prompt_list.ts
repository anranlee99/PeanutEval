//source: HuggingFaceH4/code_evaluation_prompts
const prompts: [string, number][]= [
  ["Given an m x n matrix, return all elements of the matrix in spiral order. Example 1: Input: matrix = [[1,2,3],[4,5,6],[7,8,9]] Output: [1,2,3,6,9,8,7,4,5]. Example 2: Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]] Output: [1,2,3,4,8,12,11,10,9,5,6,7]", 0],
  ["Given a string s, find the length of the longest substring without repeating characters. Example 1: Input: s = 'abcabcbb' Output: 3 Explanation: The answer is 'abc', with the length of 3. Example 2: Input: s = 'bbbbb' Output: 1 Explanation: The answer is 'b', with the length of 1. Example 3: Input: s = 'pwwkew' Output: 3 Explanation: The answer is 'wke', with the length of 3. Notice that the answer must be a substring, 'pwke' is a subsequence and not a substring.", 1], ["Given a string s containing just the characters '(', ')', '{', '}', '[' an/ ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order. Every close bracket has a corresponding open bracket of the same type. Example 1: Input: s = '()' Output: true Example 2: Input: s = '()[]{}' Output: true Example 3: Input: s = '(]' Output: false", 2]
]

export function getRandomPrompt(): [string, number] {
    const random = prompts[Math.floor(Math.random() * prompts.length)];
  return [random[0] + "Create a function that solves this problem in python. Only give me the code, nothing else, and no tests. No explanation is necesarry. Give me only python code, not psuedocode. Omit any steps taken to arrive at the code. If you do not only write python code, you will be punished" , random[1]];
}
