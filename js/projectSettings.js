import { getProjectSettings, setProjectSettings } from './state.js';

const form = document.querySelector('#project-settings form');
const projectNameInput = document.getElementById('project-name');
const spoolIdInput = document.getElementById('spool-id');
const materialInput = document.getElementById('material');
const scheduleInput = document.getElementById('schedule');
const pipeSizeInput = document.getElementById('pipe-size');
const unitsInput = document.getElementById('units');

function updateForm() {
    const settings = getProjectSettings();
    projectNameInput.value = settings.projectName;
    spoolIdInput.value = settings.spoolId;
    materialInput.value = settings.material;
    scheduleInput.value = settings.schedule;
    pipeSizeInput.value = settings.pipeSize;
    unitsInput.value = settings.units;
}

function handleInputChange(event) {
    const { name, value } = event.target;
    const newSettings = { [name.replace(/-/g, '')]: value };
    setProjectSettings(newSettings);
}

export function initProjectSettings() {
    updateForm();
    form.addEventListener('input', handleInputChange);
    console.log('Project Settings Initialized');
}
