// Very simple sandboxless executor: for production, use a safe task runner.
// This runs pre-defined commands (like toggling focus mode) mapped to Node functions.
const commands = {
  "start_focus": ({minutes}) => {
    // Example: returns an action object; actual actions executed on client
    return { action: 'start_timer', minutes: minutes || 25 };
  },
  "stop_focus": () => ({ action: 'stop_timer' })
};

function executeCommand(cmdName, params){
  if(commands[cmdName]) return commands[cmdName](params);
  return { error: 'Unknown command' };
}

module.exports = { executeCommand };
