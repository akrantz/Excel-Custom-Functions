/**
 * Adds two numbers.
 * @customfunction 
 * @param first First number
 * @param second Second number
 * @returns The sum of the two numbers.
 */
function add(first: number, second: number): number {
  return first + second;
}
CustomFunctions.associate("ADD", add);

/**
 * Displays the current time once a second.
 * @customfunction 
 * @param invocation Custom function handler  
 */
function clock(invocation: CustomFunctions.StreamingInvocation<string>): void {
  const timer = setInterval(() => {
    const time = currentTime();
    invocation.setResult(time);
  }, 1000);

  invocation.onCanceled = () => {
    clearInterval(timer);
  };
}
CustomFunctions.associate("CLOCK", clock);

/**
 * Returns the current time.
 * @returns String with the current time formatted for the current locale.
 */
function currentTime(): string {
  return new Date().toLocaleTimeString();
}

/**
 * Increments a value once a second.
 * @customfunction 
 * @param incrementBy Amount to increment
 * @param invocation Custom function handler 
 */
function incrementMatrix(incrementBy: number, invocation: CustomFunctions.StreamingInvocation<number[][]>): void {
  let current: number = 0;
  let matrix: number[][] = [];
  const timer = setInterval(() => {
    current += incrementBy;
    matrix.push([current]);
    invocation.setResult(matrix);
  }, 1000);

  invocation.onCanceled = () => {
    clearInterval(timer);
  };
}
CustomFunctions.associate("INCREMENTMATRIX", incrementMatrix);

/**
 * Writes a message to console.log().
 * @customfunction LOG
 * @param message String to write.
 * @returns String to write.
 */
function logMessage(message: string): string {
  console.log(message);

  return message;
}
CustomFunctions.associate("LOG", logMessage);
