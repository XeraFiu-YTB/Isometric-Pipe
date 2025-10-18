// Application state
let state = {
    mode: 'draw', // 'draw', 'select', 'edit'
    selectedElement: null,
    projectSettings: {
        projectName: 'New Project',
        spoolId: 'SP-001',
        material: 'Carbon Steel',
        schedule: 'Sch 40',
        pipeSize: 'DN 100 / 4-inch',
        units: 'metric' // 'metric' or 'imperial'
    }
};

// State getters
export const getMode = () => state.mode;
export const getSelectedElement = () => state.selectedElement;
export const getProjectSettings = () => state.projectSettings;

// State setters
export const setMode = (newMode) => {
    state.mode = newMode;
    console.log(`Mode changed to: ${newMode}`);
};

export const setSelectedElement = (element) => {
    state.selectedElement = element;
    console.log(`Selected element:`, element);
};

export const setProjectSettings = (newSettings) => {
    state.projectSettings = { ...state.projectSettings, ...newSettings };
    console.log('Project settings updated:', state.projectSettings);
};
