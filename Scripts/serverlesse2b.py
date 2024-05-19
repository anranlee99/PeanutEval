from e2b_code_interpreter import CodeInterpreter
import runpod
import time

def isValidParen(s: str) -> bool:
    stack = []
    mapping = {")":"(", "}":"{", "]":"["}

    for char in s:
        if char in mapping.values():
            stack.append(char)
        elif char in mapping.keys():
            if not stack or mapping[char] != stack.pop():
                return False
    
    return not stack

def lengthOfLongestSubstring(s: str) -> int:

    max_length = left = 0
    count = {}

    for right, c in enumerate(s):
        count[c] = 1 + count.get(c, 0)
        while count[c] > 1:
            count[s[left]] -= 1
            left += 1
    
        max_length = max(max_length, right - left + 1)

    return max_length

def spiralOrder(matrix: list[list[int]]) -> list[int]:
        if not matrix:
            return []

        rows, cols = len(matrix), len(matrix[0])
        top, bottom, left, right = 0, rows-1, 0, cols-1
        result = []
        
        while len(result) < rows * cols:
            for i in range(left, right+1):
                result.append(matrix[top][i])
            top += 1
            
            for i in range(top, bottom+1):
                result.append(matrix[i][right])
            right -= 1
            
            if top <= bottom:
                for i in range(right, left-1, -1):
                    result.append(matrix[bottom][i])
                bottom -= 1
            
            if left <= right:
                for i in range(bottom, top-1, -1):
                    result.append(matrix[i][left])
                left += 1
        
        return result

#input is as followed
# {
#   "input": {
#       "num_params": number
#       "code": ["codeblock1", codeblock2....]
#        "params": [params1, params2, ...] (these have parenthesis around them)
#    }
#  }
functions = ["isValidParen", "lengthOfLongestSubstring", "spiralOrder"]


def run_code(job):
    job_input = job["input"];
    params = job_input["params"]
    times = []
    correct_cnt = 0
    fail_cnt = 0;
    with CodeInterpreter() as sandbox:
        for i, code in enumerate(job_input["code"]):
            for j in range(job_input["num_params"]):
                ai_time_intial = time.time()

                output = sandbox.notebook.exec_cell(code + ";" + functions[i] + params[i][j])

                if output.error:
                    fail_cnt+=1
                    continue
                ai_time_terminal = time.time()
                
                correct_time_initial = time.time()
                correct_output = exec(functions[i]+ params[i][j])
                correct_time_terminal = time.time()


                if(output.text == correct_output):
                    correct_cnt += 1;

                times.append((ai_time_terminal-ai_time_intial)/(correct_time_terminal-correct_time_initial))
    return times, correct_cnt, fail_cnt;

runpod.serverless.start({"handler": run_code})
