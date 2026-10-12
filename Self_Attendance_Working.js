const firebase = window.firebase;
const firebaseConfig = {
    apiKey: 'AIzaSyDY453ohxvPoizc0BUngVbqblVGAAfsX4Q',
    authDomain: 'mrindia-0.firebaseapp.com',
    databaseURL: 'https://mrindia-0-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'mrindia-0',
    storageBucket: 'mrindia-0.firebasestorage.app',
    messagingSenderId: '829263357469',
    appId: '1:829263357469:web:56e8ff92e299edee83c8f4',
    measurementId: 'G-DM9KX3VTTH'
};
firebase.initializeApp(firebaseConfig);
firebase.firestore().enablePersistence({ synchronizeTabs: true }).catch(persistence_error => alert(`⚠ Persistent offline data storage could not be enabled. Unsaved data will NOT survive internet loss or fluctuation. Cause : ${persistence_error}`));

document.querySelectorAll('#add-new-theme-btn, #rename-theme-btn, #delete-theme-btn').forEach(button => button.onclick = MainThemeFunc);
document.querySelectorAll('.file_inputs').forEach(file_input => file_input.onchange = handle_file_input);
document.querySelectorAll("input[name = 'status']").forEach(radio => radio.onchange = radioChange);
document.querySelectorAll('.sign-out-btn').forEach(btn => {
    btn.onclick = () => {
        auth.signOut();
        if (uid) db.update({ 'About_the_User.lastExited': `${new Date()}` });
    };
});

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const database = firebase.firestore().collection('Self_Track_Attendance');

const login = () => auth.signInWithPopup(provider).catch(error => alert(`❌ Error signing in user: ${error}`));
const firstDateGreaterThanSecond = (date1, date2) => parseDate(date1) > parseDate(date2);
const resetlatest = () => latestTimetableMain.querySelectorAll('tbody tr').forEach(row => row.querySelectorAll('td').forEach(td => td.textContent = ''));
const attachRestoreHandlers = () => document.querySelectorAll('.restore-deleted').forEach(btn => btn.onclick = () => restore(btn.dataset.date));

document.getElementById('loginBtn').onclick = login;
document.getElementById('copy-latest-btn').onclick = copylatestdict;
document.getElementById('paste-latest-btn').onclick = pastelatest;
document.getElementById('reset-latest-btn').onclick = resetlatest;
document.getElementById('themeDropdown').onchange = MainThemeFunc;
document.getElementById('popup-btn').onclick = openPopup;
document.getElementById('save-data-btn').onclick = SaveData;
document.getElementById('attendance-btn').onclick = updateAttendanceStats;
document.getElementById('download-btn').onclick = downloadAsJSON;

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthsData = {
    1: [5, 30],
    2: [9, 61],
    3: [14, 91],
    4: [18, 122],
    5: [23, 152],
    6: [27, 182],
    7: [32, 213],
    8: [36, 243],
    9: [41, 274],
    10: [45, 304],
    11: [50, 335],
    12: [53, 365]
};

let max_number_of_months = null;
let max_number_of_themes = null;
let max_length_of_notes = null;

const invalidChars = ['.', '[', ']', '$', '/', '#', '~', '*'];
const period_select = document.getElementById('period_select');

const usersignstatus = document.getElementById('signin-message');
const last_signin_time = document.getElementById('last-signin-time');
const userInfo = document.getElementById('userInfo');
const userEmail = document.getElementById('userEmail');
const userName = document.getElementById('userName');
const usercreationtime = document.getElementById('accountcreationtime');

const theme_in_html = document.getElementById('theme');
const created_theme_name = document.getElementById('created-theme-name');
const theme_creation_time = document.getElementById('created-time');
const last_saved_time = document.getElementById('last-saved-time');
const nav = document.querySelector('nav');
const imp = document.getElementById('lets-do-it');
const main_container = document.getElementById('table-container');
const most_imp = document.getElementById('most_important');
const dropdown = document.getElementById('themeDropdown');
const latestTimetable = document.getElementById('latest-timetable');
const latestTimetableHeading = document.getElementById('latest-timetable-heading');
const latestTimetableMain = document.getElementById('latest-timetable-main');
const First = document.getElementById('first-time');
const change_date = document.getElementById('first-time-date');
const container = document.getElementById('period-container');
const notes = document.getElementById('theme-notes');
const notes_section = document.getElementById('theme-notes-section');
const notes_heading = document.getElementById('theme-notes-heading');

const fts = document.getElementById('first-time-sign-in');
const attendance = document.getElementById('attendance-display-section');
const attbtn = document.getElementById('attendance-btn');
const temp_span0 = document.getElementById('temp0');
const temp_span = document.getElementById('temp');
const checkbox = document.getElementById('myCheckbox');
const nameformultipleperiods = document.getElementById('cpn');
const statusSelect = document.getElementById('status');

const submitButton = document.getElementById('submit-date');
const cancelButton = document.getElementById('cancel-date');
const startdatefield = document.getElementById('start-date');
const start_end_show = document.getElementById('start_end_date');
const start_date_value = document.getElementById('start-date-value');
const end_date_value = document.getElementById('end-date-value');
const add_date_notes = document.getElementById('add-date-notes');
const gen_date_notes = document.getElementById('gen-date-notes');
const scroll_date_notes = document.getElementById('scroll-date-notes');
const input_dates_notes = document.getElementById('input-date-notes');
const show_dates_notes = document.getElementById('show_notes_date');
const periodtimingscontainer = document.getElementById('period-time');
const periodtimingsbtn = document.getElementById('period-time-toggle');
const latest_btn = document.getElementById('show-latest-btn');
const userPhoto = document.getElementById('userPhoto');
const addweekbtn = document.getElementById('add-week-btn');
const notes_btn = document.getElementById('toggle_notes');

let main_status_timetable = [];
let latest_timetable = {};
let main_theme = null;
let list_of_themes = new Set();
let set_of_deleted = new Set();
let already_counted = false;
let number_of_periods = null;
let selectedStatus = document.querySelector("input[name = 'status']:checked")?.value;
let periodtimingsdata = new Set();
let periodtimingdatastructure = {};
let notes_content = '';

let db = null;
let main_user = null;
let user_name = null;
let uid = null;
let user_email = null;
let user_photoURL = null;
let user_emailVerified = null;
let user_providerId = null;
let user_phoneNumber = null;
let user_creationTime = null;
let user_lastSignInTime = null;
let user_isAnonymous = null;
let user_isNewUser = null;
let user_accessToken = null;
let user_metadata = null;
let user_additionalInfo = null;
let user_credential = null;
let lastVisit = null;
let website_used = null;

window.onbeforeunload = () => { if (uid) db.update({ 'About_the_User.lastExited': `${formatCustomDate(new Date())}` }); };

checkbox.onchange = () => {
    document.querySelector("input[name = 'status'][value = '']").checked = true;
    selectedStatus = '';
    let isChecked = checkbox.checked;
    nameformultipleperiods.disabled = !isChecked;
    nameformultipleperiods.value = '';
    if (isChecked) nameformultipleperiods.focus();
};

period_select.onchange = () => {
    if (!main_status_timetable || main_status_timetable.length === 0 || !document.querySelectorAll('.table-section').length) { number_of_periods = parseInt(period_select.value, 10) || number_of_periods; return expand_latest_table(); }

    const newPeriods = parseInt(period_select.value, 10) || number_of_periods;

    if (newPeriods < number_of_periods && !confirm(`You selected fewer periods (${newPeriods}) than current (${number_of_periods}). This will erase all excess weektable columns, latest timetable column and period timings! Proceed?`)) return period_select.value = number_of_periods;
    number_of_periods = newPeriods;

    const prev_latest = convertlatesttodict();
    finalizedata();

    if (main_status_timetable) main_status_timetable = main_status_timetable.map(wtable => expand_timetable(wtable));
    already_counted = true;

    loadStoredTimetable(main_status_timetable);
    populateLatestFromDict(prev_latest);
};

notes.oninput = show_dates_whose_notes_are_there;

notes_btn.onclick = () => {
    if (notes_btn.textContent === 'Show Current Theme Notes') {
        notes_btn.textContent = 'Hide Current Theme Notes';
        notes_section.style.display = 'block';
    } else {
        notes_btn.textContent = 'Show Current Theme Notes';
        notes_section.style.display = 'none';
    }
};

latest_btn.onclick = showlatest;

addweekbtn.onclick = () => {
    createWeeklyTables(convertlatesttodict(), findNextSunday());
    addweekbtn.scrollIntoView({ behavior: 'instant', block: 'end' });
};

userPhoto.onclick = () => window.open(userPhoto.src, '_blank');

periodtimingsbtn.onclick = () => {
    if (periodtimingsbtn.textContent === 'Open Timings Form') {
        periodtimingsbtn.textContent = 'Hide Timings Form';
        periodtimingscontainer.style.display = 'block';
    } else {
        periodtimingsbtn.textContent = 'Open Timings Form';
        periodtimingscontainer.style.display = 'none';
    }
};
gen_date_notes.onclick = () => {
    let adnv = add_date_notes.value;
    if (!adnv) return alert('No Date Selected!');

    let errors = [];
    generateNotesForDate(adnv, errors);

    if (errors.length > 0) alert(`Notes generation failed for selected date ${formatDate(new Date(adnv))}: \n${errors.join('\n')}`);
};
input_dates_notes.onclick = () => {
    let raw = prompt('Enter multiple dates separated by commas, spaces, or new lines (Accepted formats: yyyy-mm-dd or dd/mm/yyyy)');
    if (!raw || !raw.trim()) return alert('No dates entered!');

    let dateList = raw.trim().split(/[\s,]+/).map(d => d.trim()).filter(dl => dl.length);

    let errors = [];

    dateList.forEach(d => generateNotesForDate(d.includes('/') ? d.split('/').reverse().join('-') : d, errors));

    if (errors.length > 0) alert(`Some dates failed: \n${errors.join('\n')}`);
};
scroll_date_notes.onclick = () => {
    updateAttendanceStats();

    let adnv = add_date_notes.value;
    if (!adnv) return alert('No Date Selected!');

    let actual_date_to_find = formatDate(new Date(adnv));
    let lines = notes.value.split('\n');

    let index = lines.findIndex(line => line.startsWith(`Date ${actual_date_to_find}`));
    if (index === -1) return alert(`Could not find date ${actual_date_to_find}!`);

    let start = 0;
    for (let i = 0; i < index; i++) start += lines[i].length + 1;
    let end = start + lines[index].length;

    notes.focus();
    notes.setSelectionRange(start, end);
    setTimeout(() => notes.scrollTop = start / notes.value.length * notes.scrollHeight - notes.clientHeight / 2, 10);
    setTimeout(() => notes.setSelectionRange(0, 0), 2500);
};

submitButton.onclick = () => {
    let dateInput = startdatefield.value;
    if (!dateInput) return alert('Please select a valid date.');

    change_date.style.display = 'none';
    dateInput = adjustToPreviousSunday(dateInput);
    let converted_dateString = formatDate(new Date(dateInput));
    remove_first();
    change_date.style.display = 'none';
    imp.style.display = 'block';
    alert(`Starting date : ${converted_dateString}. You will be able to store attendance of weeks upto Saturday ${getMaxAllowedSaturday(getMaxAllowedSunday(dateInput))} under this theme! Maximum ${max_number_of_themes} themes allowed per account!`);
    createWeeklyTables(convertlatesttodict(), dateInput);
    setTimeout(() => addweekbtn.scrollIntoView({ behavior: 'instant', block: 'end' }), 1);
    document.onkeydown = null;
};
cancelButton.onclick = () => change_date.style.display = 'none';

auth.onAuthStateChanged(async user => {
    main_container.innerHTML = ``;
    notes.value = ``;
    if (user) {
        lastVisit = formatCustomDate(new Date());
        website_used = window.location.href;
        assignUserData(user);
        userInfo.style.display = 'block';
        await loadStoredTimetable(undefined, 1);
        saveUserDataToFirestore();
    } else {
        userPhoto.src = 'https://www.gravatar.com/avatar/?d=mp';
        uid = null;
        userInfo.style.display = 'none';
        usersignstatus.textContent = 'User NOT Signed In! ❌';
        last_signin_time.textContent = theme_creation_time.textContent = created_theme_name.textContent = last_saved_time.textContent = '';
        [main_container, most_imp, dropdown, First, nav, imp].forEach(el => el.style.display = 'none');
        dropdown.innerHTML = `<option value = ''>Select a Theme to Switch to ....</option>`;
        fts.style.display = 'block';
        [main_status_timetable, latest_timetable, main_theme, set_of_deleted, periodtimingdatastructure, notes_content, number_of_periods, list_of_themes] = [null, {}, null, new Set(), {}, '', null, new Set()];
        updateAttendanceStats();
    }
    document.body.style.display = 'block';
});

function assignUserData(user) {
    if (!user) return;

    main_user = user;
    user_name = user.displayName;
    userName.textContent = user_name;
    uid = user.uid;
    db = database.doc(uid);
    user_email = user.email;
    userEmail.textContent = user_email
    user_photoURL = user.photoURL;
    userPhoto.src = user_photoURL;
    user_emailVerified = user.emailVerified;
    user_phoneNumber = user.phoneNumber;
    user_providerId = user.providerId;
    user_isAnonymous = user.isAnonymous;
    user_metadata = user.metadata;
    user_creationTime = formatCustomDate(new Date(user_metadata?.creationTime));
    usercreationtime.textContent = user_creationTime;
    user_lastSignInTime = formatCustomDate(new Date(user_metadata?.lastSignInTime));
    usersignstatus.textContent = 'User Signed In Successfully✅!';
    last_signin_time.textContent = user_lastSignInTime;
    user_additionalInfo = user.additionalInfo;
    user_isNewUser = user_additionalInfo?.isNewUser ?? 'NOT Available';
    user_credential = user.credential;
    user_accessToken = user_credential?.accessToken ?? 'NOT Available';
}

function saveUserDataToFirestore() {
    if (!uid) return;

    db.update({
        'About_the_User.name': user_name,
        'About_the_User.email': user_email,
        'About_the_User.photoURL': user_photoURL,
        'About_the_User.phoneNumber': user_phoneNumber,
        'About_the_User.createdAt': `${user_creationTime}`,
        'About_the_User.lastSignInAt': `${user_lastSignInTime}`,
        'About_the_User.lastVisited': `${lastVisit}`,
        'About_the_User.last_website_used': website_used,
        'About_the_User.is_user_email_id_verified': user_emailVerified,
        'About_the_User.providerId': user_providerId,
        'About_the_User.is_user_anonymous': user_isAnonymous,
        'About_the_User.is_user_new': user_isNewUser,
        'About_the_User.user_access_token': user_accessToken,
        'About_the_User.user_metadata': makeFirebaseSafe(user_metadata),
        'About_the_User.user_additional_info': makeFirebaseSafe(user_additionalInfo),
        'About_the_User.user_credential': makeFirebaseSafe(user_credential)
    })
        .catch(error => alert(`❌ Error saving user data: ${error}`));
}

function makeFirebaseSafe(obj) {
    if (obj === null || obj === undefined) return null;
    if (typeof obj !== 'object') return obj;
    if (obj instanceof Date) return obj.toISOString();
    if (Array.isArray(obj)) return obj.map(makeFirebaseSafe);

    const safe = {};
    for (let [k, v] of Object.entries(obj)) {
        if (typeof v === 'function' || v instanceof Blob || v instanceof File) continue;
        try {
            JSON.stringify(v);
            safe[k] = makeFirebaseSafe(v);
        } catch {
            safe[k] = String(v);
        }
    }
    return safe
}

function expand_latest_table(target = number_of_periods) {
    const table = latestTimetableMain;
    if (!table) return;

    const headRow = table.querySelector('thead tr');
    if (!headRow) return;
    if (!target || target < 1) target = 8;

    const currentHeaderCount = headRow.querySelectorAll('th').length - 1;
    if (currentHeaderCount !== target) {
        const headerHTML = '<th>Day</th>' + Array.from({ length: target }, (_, i) => `<th>${i + 1}</th>`).join('');
        headRow.innerHTML = headerHTML;
    }

    table.querySelectorAll('tbody tr').forEach(row => {
        const cells = row.querySelectorAll('td');
        const current = cells.length;

        if (current < target) {
            for (let i = current; i < target; i++) {
                const td = document.createElement('td');
                td.contentEditable = 'true';
                row.appendChild(td);
            }
        }

        else if (current > target) for (let i = current - 1; i >= target; i--) row.removeChild(cells[i]);
    });
}

function expand_timetable(table, targetPeriods = number_of_periods) {
    if (!table || !table.length) return table;

    const fixedCols = 2;

    const expanded = table.map(row => {
        const status = row[row.length - 1];
        const body = row.slice(0, -1);

        while (body.length < fixedCols + targetPeriods) body.push({ "": "" });

        if (body.length > fixedCols + targetPeriods) body.length = fixedCols + targetPeriods;

        return [...body, status];
    });

    const rowByDate = {};
    expanded.forEach(r => rowByDate[r[0]] = r);

    const allDates = expanded.map(r => parseDate(r[0]));
    let earliest = new Date(Math.min(...allDates.map(d => d.getTime())));

    const sunday = new Date(earliest);
    sunday.setDate(sunday.getDate() - sunday.getDay());

    const finalWeek = [];

    for (let i = 0; i < 7; i++) {
        const cur = new Date(sunday);
        cur.setDate(sunday.getDate() + i);

        const dateStr = formatDate(cur);
        const dayName = daysOfWeek[cur.getDay()];

        if (rowByDate[dateStr]) finalWeek.push(rowByDate[dateStr]);
        else finalWeek.push([dateStr, dayName, ...Array.from({ length: targetPeriods }, () => ({ "": "" })), "Normal"]);
    }

    return finalWeek;
}

function formatCustomDate(input, is_file_or_not) {
    try {
        const date = new Date(input);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear());

        const weekday = daysOfWeek[date.getDay()];

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        if (is_file_or_not) return `Date - ${day}-${month}-${year}, Day - ${weekday}, Time - ${hours}-${minutes}-${seconds}`;
        else return `${day}/${month}/${year}, ${weekday}, ${hours}:${minutes}:${seconds}`;
    } catch (error) {
        alert(`An Unexpected Error occured custom formatting your date : ${error}`);
    }
}

function radioChange() {
    selectedStatus = document.querySelector("input[name = 'status']:checked").value;
    if (selectedStatus !== '') {
        checkbox.checked = false;
        nameformultipleperiods.disabled = true;
        nameformultipleperiods.value = '';
    }
}

function capitalizeFirst(word) {
    if (!word) return '';
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

function bulkPromptTimingInputHandler() {
    try {
        let raw = prompt(`Enter period timings (with spaces allowed) : \nExample -> 1 : 09:05 - 09:55,  2 : 10:00 - 10:50,  3 : 11:00 - 11:50 \nFormat: period : from - to`);

        if (!raw || !raw.trim()) return alert('No data entered!');

        let errors = [];

        try {
            const jsonInput = JSON.parse(raw.trim());
            for (let [period, times] of Object.entries(jsonInput)) {
                let p = Number(period);
                if (p < 1 || p > number_of_periods) errors.push(`Period ${p} out of allowed range (1 - ${number_of_periods})`);
                else periodtimingdatastructure[p] = { from: times.from || '', to: times.to || '' };
            }
        } catch {
            let entries = raw.trim().split(/[,;\n]+/).map(x => x.trim()).filter(Boolean);

            entries.forEach(e => {
                let match = e.match(/^(\d+)\s*:\s*(\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})$/);
                if (!match) return errors.push(`Invalid format → '${e}'`);

                let period = Number(match[1]);
                let from = match[2];
                let to = match[3];

                if (period < 1 || period > number_of_periods) return errors.push(`Period ${period} out of allowed range (1 - ${number_of_periods})`);

                periodtimingdatastructure[period] = { from: from, to: to };
            });
        }

        if (errors.length) return alert(`Errors: \n${errors.join('\n')}`);
        alert('Bulk timings added successfully!');
    } catch (pterr) {
        alert(`Error adding Bulk Period Timings: ${pterr}`);
    } finally {
        generatePeriodTimingsForm();
    }
}

function bulkCopyTimingHandler() {
    if (!periodtimingdatastructure || Object.keys(periodtimingdatastructure).length === 0) return alert('No period timings to copy!');

    navigator.clipboard.writeText(JSON.stringify(periodtimingdatastructure, null, 2))
        .then(() => alert('Period timings copied to clipboard!'))
        .catch(err => alert(`Failed to copy: ${err}`));
}

function clearalltimings() {
    for (let i = 1; i <= number_of_periods; i++) {
        const from = document.getElementById(`timing_from_${i}`);
        const to = document.getElementById(`timing_to_${i}`);

        if (from) from.value = '';
        if (to) to.value = '';

        periodtimingdatastructure[i] = { from: '', to: '' };
    }
}

function generatePeriodTimingsForm() {
    periodtimingscontainer.innerHTML = '';

    const ThemeHeadingText = document.createElement('h3');
    ThemeHeadingText.textContent = main_theme ? `Theme "${main_theme}" Period Timings -` : `Theme Period Timings -`;
    ThemeHeadingText.style.color = '#d35400';
    periodtimingscontainer.appendChild(ThemeHeadingText);

    const prompt_timing_input = document.createElement('button');
    prompt_timing_input.id = 'ptiminginput';
    prompt_timing_input.textContent = 'Bulk Add Timings (via Prompt)';
    periodtimingscontainer.appendChild(prompt_timing_input);

    const copy_timings_btn = document.createElement('button');
    copy_timings_btn.id = 'ptimingcopy';
    copy_timings_btn.textContent = 'Copy Timings to Clipboard';
    periodtimingscontainer.appendChild(copy_timings_btn);

    const clear_timings_btn = document.createElement('button');
    clear_timings_btn.id = 'ptimingclear';
    clear_timings_btn.textContent = 'Clear All Timings';

    periodtimingscontainer.appendChild(clear_timings_btn);

    prompt_timing_input.onclick = bulkPromptTimingInputHandler;
    copy_timings_btn.onclick = bulkCopyTimingHandler;
    clear_timings_btn.onclick = clearalltimings;

    periodtimingdatastructure = Object.fromEntries(Object.entries(periodtimingdatastructure).slice(0, number_of_periods));
    for (let i = 1; i <= number_of_periods; i++) {

        const periodDiv = document.createElement('div');
        periodDiv.className = 'period-row';

        const label = document.createElement('label');
        label.textContent = `Period ${i}: `;

        const fromInput = document.createElement('input');
        fromInput.type = 'time';
        fromInput.id = `timing_from_${i}`;
        fromInput.required = true;

        const toInput = document.createElement('input');
        toInput.type = 'time';
        toInput.id = `timing_to_${i}`;
        toInput.required = true;

        if (periodtimingdatastructure[i]) {
            fromInput.value = periodtimingdatastructure[i].from || '';
            toInput.value = periodtimingdatastructure[i].to || '';
        } else periodtimingdatastructure[i] = { from: '', to: '' };

        fromInput.oninput = () => savePeriodTime(i);
        toInput.oninput = () => savePeriodTime(i);

        periodDiv.appendChild(label);
        periodDiv.appendChild(fromInput);

        const toText = document.createElement('h3');
        toText.textContent = 'to';
        toText.style.color = '#d35400';
        periodDiv.appendChild(toText);

        periodDiv.appendChild(toInput);

        periodtimingscontainer.appendChild(periodDiv);
    }
}

function savePeriodTime(tid) {
    const from = document.getElementById(`timing_from_${tid}`).value;
    const to = document.getElementById(`timing_to_${tid}`).value;
    periodtimingdatastructure[tid] = { from, to };
}

function show_dates_whose_notes_are_there() {
    notes_content = notes.value;
    const dates = Array.from(notes_content.matchAll(/Date\s+(\d{2}\/\d{2}\/\d{4})/g)).map(m => m[1]);
    show_dates_notes.value = dates.join(', ');
}

function generateNotesForDate(dateString, errorCollector) {
    let date_notes_to_add = formatDate(new Date(dateString));

    let rdc = Array.from(document.querySelectorAll('.date-cell')).find(dc => dc.textContent.trim() === date_notes_to_add);

    if (!rdc) return errorCollector.push(`No Date Cell found for: ${dateString}`);

    let rwr = rdc.closest('.week-row');
    if (!rwr) return errorCollector.push(`No Week Row found for: ${dateString}`);

    let notes_to_add = `Date ${rdc.textContent.trim()} → `;

    rwr.querySelectorAll('.period').forEach((rps, rpin) => {
        if (!rps.textContent.trim() || (rpin + 1) > number_of_periods) return;

        let from = document.getElementById(`timing_from_${rpin + 1}`)?.value || 'HH:MM';
        let to = document.getElementById(`timing_to_${rpin + 1}`)?.value || 'HH:MM';

        notes_to_add += `${rpin + 1}) ${rps.textContent.trim()} - ${from} to ${to}, `;
    });

    notes_to_add = notes_to_add.slice(0, -2) + '; Extra Notes for the Date - ""\n';

    notes_content = notes.value;

    if (!notes_content.trim().trim('\n')) notes_content = notes_to_add;
    else if (notes_content.endsWith('\n')) notes_content += notes_to_add;
    else notes_content += '\n' + notes_to_add;

    updateAttendanceStats();

    let lines = notes.value.split('\n');
    let lastIndex = lines.length - 1;

    let start = 0;
    for (let i = 0; i < lastIndex; i++) start += lines[i].length + 1;
    let end = start + lines[lastIndex].length;

    notes.focus();
    notes.setSelectionRange(start, end);

    setTimeout(() => notes.scrollTop = (start / notes.value.length) * notes.scrollHeight - notes.clientHeight / 2, 10);
    setTimeout(() => notes.setSelectionRange(0, 0), 2500);
}

function SaveData() {
    try {
        if (!uid) return login(alert('❌ No user is signed in! Triggering sign in as data cannot be saved without sign in .....'));
        if (!main_theme && list_of_themes.size >= max_number_of_themes) return alert(`Max ${max_number_of_themes} themes reached. Save under an existing theme or make a new account.`);

        datatobesaved = finalizedata();

        if (!main_theme) {
            let save_input_theme = prompt('Please enter a theme name for your timetable:')?.trim();
            if (!save_input_theme) return alert(`No theme name provided by user ${user_name}. Data will not be saved.`);
            if (list_of_themes.has(save_input_theme)) return alert('This theme already exists. Please enter a different name to set as theme!');
            if (invalidChars.some(char => save_input_theme.includes(char))) return alert(`❌ Invalid theme name "${new_theme}". Please avoid using characters ${invalidChars}`);
            if (save_input_theme.length > 100) alert("Theme too long, trimming to 100 characters");
            main_theme = save_input_theme.slice(0, 100);
            theme_in_html.textContent = main_theme;
            let tct = formatCustomDate(new Date());
            db.set({ [`${main_theme} theme_creation_time`]: tct }, { merge: true }).then(() => { created_theme_name.textContent = main_theme; theme_creation_time.textContent = tct; }).catch(error => alert(`❌ Error saving theme creation time to backend: ${error}`));
        }
        list_of_themes.add(main_theme);
        if (list_of_themes) {
            dropdown.innerHTML = `
            <option value = ''>Select a Theme to Switch to ....</option>
            `;
            dropdown.style.display = 'block';
            list_of_themes.forEach(theme => {
                let option = document.createElement('option');
                option.value = theme;
                option.textContent = theme;
                dropdown.appendChild(option);
            });
        }
        validateAndTruncateThemes();
        datatobesaved = validateAndTruncateData(datatobesaved);
        if (!datatobesaved) return alert('Empty data, cannot save!')
        saveUserDataToFirestore();
        notes_content = notes.value.trim().replaceAll('<br>', '\n');
        if (notes_content.length > max_length_of_notes) alert(`Your note exceeds the maximum allowed length of ${max_length_of_notes} characters. It will be trimmed to the first ${max_length_of_notes} characters.`);
        notes_content = notes_content.slice(0, max_length_of_notes);
        db.set({
            theme: main_theme,
            [`${main_theme} AttendanceData`]: JSON.stringify(datatobesaved),
            [`${main_theme} latest_timetable`]: JSON.stringify(convertlatesttodict()),
            [`${main_theme} Notes`]: notes_content,
            [`${main_theme} period_timings`]: JSON.stringify(periodtimingdatastructure),
            all_themes: Array.from(list_of_themes),
            About_the_User: { [`lastDataSavedAt ${main_theme}`]: `${formatCustomDate(new Date())}` }
        }, { merge: true })
            .then(() => { alert(`Data saved successfully for user ${user_name} under theme ${main_theme}!`); loadStoredTimetable(undefined, undefined, 1); })
            .catch(error => alert(`❌ Error writing data to backend: ${error}`));
    }
    catch (error) { alert(`❌ Error saving data: ${error}`); }
}

async function RetrieveData() {
    if (!uid) return login(alert('❌ No user is signed in! Triggering sign in'));
    try {
        let snap = await db.get();
        let data = snap.data();
        max_number_of_months = 12;
        max_number_of_themes = 12;
        max_length_of_notes = 40000;

        theme_in_html.textContent = '';
        if (!data) {
            alert(`❌ No data found for user: ${user_name}. Seems like you are using our website for the first time.`);
            db.set({}, { merge: true })
            saveUserDataToFirestore();
            return null;
        }
        list_of_themes = new Set(data.all_themes);
        validateAndTruncateThemes();
        if (list_of_themes) {
            dropdown.innerHTML = `
            <option value = ''>Select a Theme to Switch to ....</option>
            `;
            dropdown.style.display = 'block';
            list_of_themes.forEach(theme => {
                let option = document.createElement('option');
                option.value = theme;
                option.textContent = theme;
                dropdown.appendChild(option);
            });
        }

        main_theme = data.theme;
        theme_in_html.textContent = main_theme || '';
        theme_creation_time.textContent = data?.[`${main_theme} theme_creation_time`] ?? '';
        created_theme_name.textContent = theme_creation_time.textContent && main_theme;
        last_saved_time.textContent = data?.About_the_User?.[`lastDataSavedAt ${main_theme}`] ?? '';

        if (!main_theme) return null;

        notes_content = data[`${main_theme} Notes`] || '';
        periodtimingdatastructure = JSON.parse(data[`${main_theme} period_timings`] || "{}");

        let userretrive = JSON.parse(data[`${main_theme} AttendanceData`] || "null");
        let usr_len = userretrive?.[0]?.[0]?.length;
        period_select.value = number_of_periods = (!usr_len || usr_len - 3 < 1 || usr_len - 3 > 24) ? 8 : usr_len - 3;

        populateLatestFromDict(JSON.parse(data[`${main_theme} latest_timetable`] || "null"));

        return userretrive;
    } catch (error) {
        alert(`❌ Error retrieving data for user ${user_name} : ${error}.\n If error is related to internet or connection, please reload the website! You will get back your data if you saved earlier! Do not enter and save new data as it will overwrite existing data!`);
        return null;
    }
}

async function MainThemeFunc(event) {
    try {
        const targetId = event.target.id;
        if (targetId === 'themeDropdown') {
            let new_theme = dropdown.value;
            if (new_theme === '') return;
            if (new_theme === main_theme) {
                alert('This is already the current theme. Please select a different one.');
                dropdown.value = '';
                return null;
            }
            if (main_theme && main_status_timetable) {
                let conf = confirm(`Make sure that you have saved all your data under current theme "${main_theme}" before switching to theme "${new_theme}".\nOtherwise, all changes will be lost.\nConfirm to switch to theme "${new_theme}"?`);
                if (!conf) {
                    dropdown.value = '';
                    return null;
                }
            }
            db.set({
                theme: new_theme,
                all_themes: Array.from(list_of_themes)
            }, { merge: true })
                .then(() => { [main_status_timetable, latest_timetable, main_theme, set_of_deleted, periodtimingdatastructure, notes_content, number_of_periods, list_of_themes] = [null, {}, null, new Set(), {}, '', null, new Set()]; loadStoredTimetable(); })
                .catch(error => alert(`❌ Error changing theme: ${error}`));
        }

        if (targetId === 'add-new-theme-btn') {
            if (list_of_themes.size >= max_number_of_themes) return alert(`You've reached the limit of ${max_number_of_themes} themes for this account. To add more themes, please create a new account.`);
            let new_theme = prompt('Please enter new theme name:')?.trim();
            if (!new_theme) return alert(`No theme name provided by user ${user_name}. Will not add new theme`);
            if (list_of_themes.has(new_theme)) return alert('This theme already exists. Please enter a different name to set as theme!');
            if (invalidChars.some(char => new_theme.includes(char))) return alert(`❌ Invalid theme name "${new_theme}". The characters ${invalidChars} are not permitted in theme names.`);
            if (new_theme.length > 100) alert("Theme too long, trimming to 100 characters");
            new_theme = new_theme.slice(0, 100);

            list_of_themes.add(new_theme);
            db.set({
                theme: new_theme,
                all_themes: Array.from(list_of_themes),
                [`${new_theme} theme_creation_time`]: formatCustomDate(new Date())
            }, { merge: true })
                .then(() => { [main_status_timetable, latest_timetable, main_theme, set_of_deleted, periodtimingdatastructure, notes_content, number_of_periods, list_of_themes] = [null, {}, null, new Set(), {}, '', null, new Set()]; loadStoredTimetable(); })
                .catch(error => alert(`❌ Error adding new theme: ${error}`));
        }

        if (targetId === 'rename-theme-btn') {
            if (!main_theme) return alert(`No current theme found for user ${user_name}. Cannot rename theme. Please press the 'Save Data' button to enter theme name and then save data under the theme to rename it!`);
            let local_snap = await db.get();
            let local_data = local_snap.data();
            if (!local_data[`${main_theme} AttendanceData`]) return alert(`Please save some data under current theme "${main_theme}" in order to rename it!`);

            let renamed_theme = prompt('Please enter a new theme name to rename current theme to:', main_theme)?.trim();
            if (!renamed_theme) return alert(`No theme name provided by user ${user_name}. Will not rename!`);
            if (renamed_theme === main_theme) return alert('You entered the same theme name as the original one. Please enter a different name.');

            if (list_of_themes.has(renamed_theme)) return alert('This theme name already exists. Please choose another one.');

            if (invalidChars.some(char => renamed_theme.includes(char))) return alert(`❌ Invalid theme name "${renamed_theme}". Please avoid using characters ${invalidChars}`);

            if (renamed_theme.length > 100) alert("Theme too long, trimming to 100 characters");
            renamed_theme = renamed_theme.slice(0, 100);

            list_of_themes.delete(main_theme);
            list_of_themes.add(renamed_theme);
            db.update({
                theme: renamed_theme,
                [`${renamed_theme} AttendanceData`]: local_data[`${main_theme} AttendanceData`],
                [`${renamed_theme} latest_timetable`]: local_data[`${main_theme} latest_timetable`] || JSON.stringify(convertlatesttodict()),
                [`${renamed_theme} Notes`]: local_data[`${main_theme} Notes`],
                [`About_the_User.lastDataSavedAt ${renamed_theme}`]: local_data[`About_the_User`][`lastDataSavedAt ${main_theme}`],
                [`${renamed_theme} period_timings`]: local_data[`${main_theme} period_timings`],
                [`${renamed_theme} theme_creation_time`]: local_data[`${main_theme} theme_creation_time`],
                [`${main_theme} AttendanceData`]: firebase.firestore.FieldValue.delete(),
                [`${main_theme} latest_timetable`]: firebase.firestore.FieldValue.delete(),
                [`${main_theme} Notes`]: firebase.firestore.FieldValue.delete(),
                [`About_the_User.lastDataSavedAt ${main_theme}`]: firebase.firestore.FieldValue.delete(),
                [`${main_theme} period_timings`]: firebase.firestore.FieldValue.delete(),
                [`${main_theme} theme_creation_time`]: firebase.firestore.FieldValue.delete(),
                all_themes: Array.from(list_of_themes)
            })
                .then(() => { [main_status_timetable, latest_timetable, main_theme, set_of_deleted, periodtimingdatastructure, notes_content, number_of_periods, list_of_themes] = [null, {}, null, new Set(), {}, '', null, new Set()]; loadStoredTimetable(); })
                .catch(error => alert(`❌ Error renaming theme: ${error}`));
        }

        if (targetId === 'delete-theme-btn') {
            if (!user_name) return alert('User not identified. Please sign in and try again.');
            if (!main_theme) return alert('No theme is currently selected, so there is nothing to delete.');
            if (document.querySelectorAll('.table-section').length && (!confirm(`Delete theme "${main_theme}"?\n\nAll data under this theme will be permanently lost. To keep a copy, click "Download Attendance Data" first, and load it later using the file input beside that button.`) || prompt(`Final confirmation: type exactly "${user_name}/${main_theme}" to permanently delete this theme.`) !== `${user_name}/${main_theme}`)) return alert(`Deletion cancelled. Theme "${main_theme}" was not deleted, either because you cancelled or because the confirmation text did not exactly match "${user_name}/${main_theme}".`);
            const ptd = main_theme;
            list_of_themes.delete(main_theme);
            theme_in_html.textContent = '';
            db.update({
                theme: list_of_themes.values().next().value ?? firebase.firestore.FieldValue.delete(),
                [`${main_theme} AttendanceData`]: firebase.firestore.FieldValue.delete(),
                [`${main_theme} latest_timetable`]: firebase.firestore.FieldValue.delete(),
                [`${main_theme} Notes`]: firebase.firestore.FieldValue.delete(),
                [`About_the_User.lastDataSavedAt ${main_theme}`]: firebase.firestore.FieldValue.delete(),
                [`${main_theme} period_timings`]: firebase.firestore.FieldValue.delete(),
                [`${main_theme} theme_creation_time`]: firebase.firestore.FieldValue.delete(),
                all_themes: Array.from(list_of_themes)
            })
                .then(() => { [main_status_timetable, latest_timetable, main_theme, set_of_deleted, periodtimingdatastructure, notes_content, number_of_periods, list_of_themes] = [null, {}, null, new Set(), {}, '', null, new Set()]; loadStoredTimetable(); alert(`Theme "${ptd}" successfully deleted!`); })
                .catch(error => alert(`❌ Error deleting fields: ${error}`));
        }
    } catch (error) {
        alert(`❌ Error in handling theme changes: ${error}`);
    }
}

function handle_file_input(event) {
    const user_inputted_file = event.target.files[0];

    if (!user_inputted_file) return alert('No file selected.');

    const file_reader = new FileReader();

    file_reader.readAsText(user_inputted_file);

    file_reader.onload = roe => {
        try {
            let data = JSON.parse(roe.target.result);

            if (!data[0]) return alert('Main weektables data missing from file passed! Cannot load timetable, please try from a different file!');

            remove_first();

            const main_weektables_data_length = data?.[0]?.[0]?.[0]?.length ?? 0;
            period_select.value = number_of_periods = (main_weektables_data_length - 3 < 1 || main_weektables_data_length - 3 > 24) ? 8 : (main_weektables_data_length - 3);
            data[0] = validateAndTruncateData(data[0]);
            notes_content = data[2];
            periodtimingdatastructure = (data[3] && typeof data[3] === 'object' && !Array.isArray(data[3])) ? data[3] : {};
            loadStoredTimetable(data[0], 1);
            populateLatestFromDict(data[1]);

            alert(`Timetable loaded successfully in webpage for user ${user_name} using attendance data from inputted file!`);
        } catch (error) {
            alert(`Failed to parse the JSON file: ${error}`);
            updateAttendanceStats();
        }
        finally {
            document.querySelectorAll('.file_inputs').forEach(file_input => file_input.value = '');
        }
    };

    file_reader.onerror = roerr => {
        alert(`There was a problem reading the file: ${roerr}.`);
        document.querySelectorAll('.file_inputs').forEach(file_input => file_input.value = '');
    };
}

function first() {
    main_status_timetable = null;
    set_of_deleted = new Set();
    updateAttendanceStats();

    [main_container, nav, imp, attendance].forEach(el => el.style.display = 'none');
    [most_imp, First].forEach(el => el.style.display = 'block');

    temp_span0.textContent = main_theme ? `No stored attendance data found` : 'No Current Theme found';
    temp_span.textContent = main_theme ? ` under theme "${main_theme}"` : '';

    expand_latest_table();
}

function remove_first() {
    First.style.display = 'none';
    change_date.style.display = 'none';
    nav.style.display = 'flex';

    updateAttendanceStats();
}

function formatDate(date) {
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function parseDate(date) {
    let day, month, year;

    if (date.includes('-')) [year, month, day] = date.split('-').map(Number);
    else if (date.includes('/')) [day, month, year] = date.split('/').map(Number);
    else throw new Error('Invalid date format. Use YYYY-MM-DD or DD/MM/YYYY.');

    return new Date(year, month - 1, day);
}

function get_starting_date() {
    first();
    change_date.style.display = 'block';
    setTimeout(() => submitButton.scrollIntoView({ behavior: 'instant', block: 'center' }), 1);
    document.onkeydown = kde => { if (kde.key === 'Enter') submitButton.click(); };
}

function adjustToPreviousSunday(dateString) {
    let [year, month, day] = dateString.split('-').map(Number);
    let converted_dateString = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
    let date = new Date(year, month - 1, day);
    if (date.getDay() === 0) alert(`Selected date : ${converted_dateString} is a Sunday`);
    else alert(`Selected date : ${converted_dateString} is a ${daysOfWeek[date.getDay()]}. Adjusting to previous Sunday`);

    while (date.getDay() !== 0) date.setDate(date.getDate() - 1);

    let yyyy = date.getFullYear();
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let dd = String(date.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
}

function findNextSunday() {
    try {
        let weekTables = document.querySelectorAll('.table-section');
        if (weekTables.length === 0) return null;
        let lastWeekTable = weekTables[weekTables.length - 1];
        let weekRows = lastWeekTable.querySelectorAll('.week-row');
        if (weekRows.length === 0) return null;
        let lastRow = weekRows[weekRows.length - 1];
        let dateCell = lastRow.querySelector('.date-cell');
        let dayCell = lastRow.querySelector('.day-cell'); let dateValue = dateCell?.textContent ?? null;
        let dayValue = dayCell?.textContent ?? null;
        if (!dateValue || !dayValue) return null;
        let [day, month, year] = dateValue.split('/').map(Number);
        let currentDate = new Date(year, month - 1, day);
        if (currentDate.getDay() === 0) currentDate.setDate(currentDate.getDate() + 7);
        else { while (currentDate.getDay() !== 0) currentDate.setDate(currentDate.getDate() + 1); }
        let nextSunday = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
        return nextSunday;
    } catch (error) {
        alert(`An error occured : ${error}`);
    }
}

function getMaxAllowedSunday(inputDate) {
    let day, month, year;

    if (inputDate.includes('-')) [year, month, day] = inputDate.split('-').map(Number);
    else if (inputDate.includes('/')) [day, month, year] = inputDate.split('/').map(Number);

    let start = new Date(year, month - 1, day);
    let maxDate = new Date(start);
    maxDate.setDate(start.getDate() + monthsData[max_number_of_months][1]);

    while (maxDate.getDay() !== 0) maxDate.setDate(maxDate.getDate() - 1);

    let yyyy = maxDate.getFullYear();
    let mm = String(maxDate.getMonth() + 1).padStart(2, '0');
    let dd = String(maxDate.getDate()).padStart(2, '0');

    return `${dd}/${mm}/${yyyy}`;
}

function getMaxAllowedSaturday(inputDate) {
    let day, month, year;

    if (inputDate.includes('-')) [year, month, day] = inputDate.split('-').map(Number);
    else if (inputDate.includes('/')) [day, month, year] = inputDate.split('/').map(Number);

    let start = new Date(year, month - 1, day);

    while (start.getDay() !== 6) start.setDate(start.getDate() + 1);

    let yyyy = start.getFullYear();
    let mm = String(start.getMonth() + 1).padStart(2, '0');
    let dd = String(start.getDate()).padStart(2, '0');

    return `${dd}/${mm}/${yyyy}`;
}

function validateAndTruncateThemes() {
    if (list_of_themes.size > max_number_of_themes) {
        alert(`The number of themes you are trying to save exceeds ${max_number_of_themes}. Truncating to the first ${max_number_of_themes} themes.`);
        list_of_themes = new Set([...list_of_themes].slice(0, max_number_of_themes));
    }
}

function validateAndTruncateData(data) {
    if (!data) return;

    if (!Array.isArray(data)) {
        alert('Invalid data format: Expected the main data to be an array containing multiple week data arrays.');
        return null;
    }

    if (data.some(week => !Array.isArray(week))) {
        alert('Invalid data format: Expected an array of week data, where each week data itself should be an array containing multiple row data arrays.');
        return null;
    }

    if (data.some(week => week.some(row => !Array.isArray(row)))) {
        alert('Invalid data format: Expected an array of week data, where each week data is an array of row data arrays, and each row data should be an array containing individual entries.');
        return null;
    }

    let d1 = monthsData[max_number_of_months][0];
    let d2 = 7;
    let d3 = number_of_periods + 3;

    let truncationLogs = [];


    if (data.length > d1) {
        truncationLogs.push(`❌ Main data exceeded allowed weeks: ${data.length} → ${d1}`);
        data.length = d1;
    }

    data.forEach((week, wi) => {
        if (week.length > d2) {
            truncationLogs.push(`⚠️ Week[${wi}] exceeded allowed rows: ${week.length} → ${d2}`);
            week.length = d2;
        }

        week.forEach((row, ri) => {
            if (row.length > d3) {
                truncationLogs.push(`🔹 Week[${wi}] Row[${ri}] exceeded allowed cells: ${row.length} → ${d3}`);
                row.length = d3;
            }

            let oldRow = [...row];

            row[0] = String(row[0]).substring(0, 10);

            row[1] = String(row[1]);
            if (!daysOfWeek.includes(row[1])) {
                truncationLogs.push(`🔸 Week[${wi}] Row[${ri}] day '${oldRow[1]}' replaced with 'Monday'`);
                row[1] = 'Monday';
            }

            let [dd, mm, yy] = row[0].split('/');
            if (dd && mm && yy) {
                let realDay = daysOfWeek[new Date(yy, mm - 1, dd).getDay()];
                if (row[1] !== realDay) {
                    truncationLogs.push(`🔧 Week[${wi}] Row[${ri}] day '${row[1]}' corrected → '${realDay}' (based on date ${row[0]})`);
                    row[1] = realDay;
                }
            }

            row[row.length - 1] = String(row[row.length - 1]);
            if (!(row[row.length - 1] === 'Normal' || row[row.length - 1] === 'Delete')) {
                truncationLogs.push(`🔸 Week[${wi}] Row[${ri}] last cell '${oldRow[row.length - 1]}' replaced with 'Normal'`);
                row[row.length - 1] = 'Normal';
            }

            for (let k = 2; k < row.length - 1; k++) {
                if (typeof row[k] !== 'object' || row[k] === null) {
                    row[k] = { '': '' };
                    truncationLogs.push(`🔸 Week[${wi}] Row[${ri}] Cell[${k}] invalid → replaced with empty object`);
                } else {
                    let entries = Object.entries(row[k]);
                    if (entries.length > 0) {
                        let [key, value] = entries[0];
                        let oldKey = key, oldValue = value;
                        key = String(key).trim().substring(0, 100).toUpperCase();
                        let validValues = ['Present', 'Absent', 'no-class', ''];
                        value = key === '' ? '' : (validValues.includes(value) ? value : '');
                        row[k] = { [key]: value };
                        if (oldKey !== key || oldValue !== value) truncationLogs.push(`🔹 Week[${wi}] Row[${ri}] Cell[${k}] adjusted from {${oldKey}:${oldValue}} → {${key}:${value}}`);
                    } else {
                        row[k] = { '': '' };
                        truncationLogs.push(`🔸 Week[${wi}] Row[${ri}] Cell[${k}] empty object → replaced with blank`);
                    }
                }
            }
        });
    });

    if (truncationLogs.length > 0) alert(`Data truncation summary (see console for better clarity): \n\n${truncationLogs.join('\n')}`);

    let allDates = [];

    data.forEach(week =>
        week.forEach(row => {
            if (row && row[0]) allDates.push(row[0]);
        })
    );

    const toNum = s => {
        let [d, m, y] = s.split('/');
        return Number(`${y}${m.padStart(2, '0')}${d.padStart(2, '0')}`);
    }

    allDates = allDates.map(toNum).sort((a, b) => a - b);

    let minDate = allDates[0];
    let maxDate = allDates[allDates.length - 1];

    const nextDay = n => {
        let y = Math.floor(n / 10000);
        let m = Math.floor((n % 10000) / 100);
        let d = n % 100;
        let dt = new Date(y, m - 1, d + 1);
        let yy = dt.getFullYear();
        let mm = String(dt.getMonth() + 1).padStart(2, '0');
        let dd = String(dt.getDate()).padStart(2, '0');
        return Number(`${yy}${mm}${dd}`);
    }

    let missing = [];
    let cur = minDate;
    while (cur < maxDate) {
        let nxt = nextDay(cur);
        if (!allDates.includes(nxt)) missing.push(nxt);
        cur = nxt;
    }

    const toDDMMYYYY = n => {
        let s = String(n);
        let y = s.slice(0, 4);
        let m = s.slice(4, 6);
        let d = s.slice(6, 8);
        return `${d}/${m}/${y}`;
    }

    const getDayName = n => {
        let s = String(n);
        let y = s.slice(0, 4);
        let m = Number(s.slice(4, 6)) - 1;
        let d = Number(s.slice(6, 8));
        return daysOfWeek[new Date(y, m, d).getDay()];
    }

    missing.forEach(n => {
        let dd = toDDMMYYYY(n);
        let dn = getDayName(n);


        let diffDays = Math.floor((n - minDate) / 10000 * 365);

        let startDate = new Date(String(minDate).slice(0, 4), Number(String(minDate).slice(4, 6)) - 1, Number(String(minDate).slice(6, 8)));
        let thisDate = new Date(String(n).slice(0, 4), Number(String(n).slice(4, 6)) - 1, Number(String(n).slice(6, 8)));
        diffDays = Math.floor((thisDate - startDate) / 86400000);

        let w = Math.floor(diffDays / 7);
        if (!data[w]) data[w] = [];


        let newRow = [];
        newRow.push(dd);
        newRow.push(dn);

        for (let i = 0; i < number_of_periods; i++)    newRow.push({ '': '' });

        newRow.push('Normal');

        data[w].push(newRow);
    });

    const dateToNum = s => {
        let [d, m, y] = s.split('/');
        return Number(`${y}${m.padStart(2, '0')}${d.padStart(2, '0')}`);
    };

    let sortingFixLogs = [];

    data.forEach((week, wi) => {
        if (!Array.isArray(week)) return;

        let before = week.map(r => r[0]);

        week.sort((a, b) => dateToNum(a[0]) - dateToNum(b[0]));

        let after = week.map(r => r[0]);

        if (JSON.stringify(before) !== JSON.stringify(after)) sortingFixLogs.push(`🔧 Week[${wi}] rows were NOT in ascending date order → FIXED`);
    });

    if (sortingFixLogs.length > 0) alert(`Some rows were out of order and have been auto-sorted: \n${sortingFixLogs.join("\n")}`);

    return data;
}

function addweekbuttons(htmlweektable) {
    let buttonContainer = document.createElement('div');
    buttonContainer.className = 'week-buttons';

    let button1 = document.createElement('button');
    button1.textContent = 'All Week';
    button1.onclick = () => {
        if (selectedStatus) {
            button1.closest('.table-section').querySelectorAll('.period').forEach(periodCell => {
                periodCell.classList.remove('Present', 'Absent', 'no-class');
                periodCell.classList.add(selectedStatus);
            });
            updateAttendanceStats();
        }
    };
    button1.className = 'all-week-btn';

    let button2 = document.createElement('button');
    button2.textContent = 'Delete Week';
    button2.className = 'delete-week-btn';
    button2.onclick = () => deleteAllWeek(htmlweektable);

    let setaslatest = document.createElement('button');
    setaslatest.textContent = 'Set as latest';
    setaslatest.className = 'set-latest-btn';
    setaslatest.onclick = () => populateLatestFromDict(convertpagetabletodictforlatest(htmlweektable));

    let copydaywise = document.createElement('button');
    copydaywise.textContent = 'Copy Day Wise Status of weektable';
    copydaywise.className = 'copy-day-wise';
    copydaywise.onclick = () => copypagetablestatus(htmlweektable);

    let pastedaywise = document.createElement('button');
    pastedaywise.textContent = 'Paste Status Dictionary to update corresponding weektable';
    pastedaywise.className = 'paste-day-wise';
    pastedaywise.onclick = () => updatestatustoweektable(htmlweektable);

    let resetweektable = document.createElement('button');
    resetweektable.textContent = 'Reset Corresponding Weektable';
    resetweektable.className = 'reset-table';
    resetweektable.onclick = () => resetWeekTable(htmlweektable);

    buttonContainer.appendChild(button1);
    buttonContainer.appendChild(button2);
    buttonContainer.appendChild(setaslatest);
    buttonContainer.appendChild(copydaywise);
    buttonContainer.appendChild(pastedaywise);
    buttonContainer.appendChild(resetweektable);

    htmlweektable.insertBefore(buttonContainer, htmlweektable.firstChild);
    main_container.appendChild(htmlweektable);
}

function addrowbuttons(htmlweektable, htmlweekrow) {
    let allCell = document.createElement('td');
    allCell.className = 'all-cell';
    let allBtn = document.createElement('button');
    allBtn.className = 'all-btn';
    allBtn.textContent = 'All';
    allBtn.onclick = () => {
        if (selectedStatus !== '') {
            allBtn.closest('.week-row').querySelectorAll('.period').forEach(periodCell => {
                periodCell.classList.remove('Present', 'Absent', 'no-class');
                periodCell.classList.add(selectedStatus);
            });
            updateAttendanceStats();
        }
    };
    allCell.appendChild(allBtn);

    let deleteCell = document.createElement('td');
    deleteCell.className = 'delete-cell';
    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'del-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteDay(deleteCell);
    deleteCell.appendChild(deleteBtn);

    htmlweekrow.appendChild(allCell);
    htmlweekrow.appendChild(deleteCell);
    htmlweektable.appendChild(htmlweekrow);
}

function buildWeekSection({ sourceData, isFromStorage = false, startDate = null }) {
    let weekSection = document.createElement('tbody');
    weekSection.className = 'table-section';
    weekSection.style.marginTop = main_container.children.length === 0 ? '0px' : '50px';

    let headerRow = document.createElement('tr');
    headerRow.className = 'week-header-row';
    ['Date', 'Day', ...Array.from({ length: number_of_periods }, (_, i) => `${i + 1}`)].forEach(text => {
        let th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    weekSection.appendChild(headerRow);

    let weekDate = startDate ? new Date(startDate) : null;

    for (let i = 0; i < 7; i++) {
        let rowData = isFromStorage ? sourceData[i] : null;

        if (isFromStorage && rowData[rowData.length - 1] === 'Delete') continue;

        let dayName = isFromStorage ? rowData[1] : daysOfWeek[weekDate.getDay()];

        let periods = isFromStorage ? rowData.slice(2, rowData.length - 1) : (sourceData[dayName] || Array(number_of_periods).fill(''));

        let dayRow = document.createElement('tr');
        dayRow.className = 'week-row';

        let dateCell = document.createElement('td');
        dateCell.className = 'date-cell';
        dateCell.textContent = isFromStorage ? rowData[0] : formatDate(weekDate);
        dayRow.appendChild(dateCell);

        let dayCell = document.createElement('td');
        dayCell.className = 'day-cell';
        dayCell.textContent = dayName;
        dayRow.appendChild(dayCell);

        for (let j = 0; j < number_of_periods; j++) {
            let periodCell = document.createElement('td');
            periodCell.className = 'period';

            if (isFromStorage) {
                periodCell.textContent = Object.keys(periods[j])[0];
                if (Object.values(periods[j])[0] !== '') periodCell.classList.add(Object.values(periods[j])[0]);
            }
            else periodCell.textContent = periods[j] || '';

            periodCell.onmousedown = () => {
                if (checkbox.checked) {
                    periodCell.contentEditable = false;
                    periodCell.textContent = nameformultipleperiods.value;
                }
                else if (selectedStatus !== '') {
                    periodCell.contentEditable = false;
                    periodCell.classList.remove('Present', 'Absent', 'no-class');
                    periodCell.classList.add(selectedStatus);
                }
                else periodCell.contentEditable = true;
                updateAttendanceStats();
            };

            periodCell.onblur = updateAttendanceStats;
            dayRow.appendChild(periodCell);
        }

        addrowbuttons(weekSection, dayRow);
        weekSection.appendChild(dayRow);

        if (weekDate) weekDate.setDate(weekDate.getDate() + 1);
    }

    addweekbuttons(weekSection);
    return weekSection;
}

function createWeeklyTables(param_timetable, sunday_date) {
    try {
        if (fts.style.display === 'block') fts.style.display = 'none';

        let weekDate;
        if (!sunday_date) return get_starting_date();
        else {
            let selected_date = sunday_date;
            if (main_status_timetable?.[0]?.[0]?.[0]) selected_date = main_status_timetable[0][0][0];

            let max_allowed_date = getMaxAllowedSunday(selected_date);
            let noofweektables = document.querySelectorAll('.table-section');

            if (firstDateGreaterThanSecond(sunday_date, max_allowed_date)) return alert(`Can create weektables up to ${getMaxAllowedSaturday(max_allowed_date)} only!`);

            if (noofweektables.length >= monthsData[max_number_of_months][0]) return alert(`Cannot create more than ${monthsData[max_number_of_months][0]} weektables!`);

            weekDate = new Date(sunday_date);
        }

        main_container.style.display = 'table';

        number_of_periods ??= parseInt(period_select.value, 10) || 8;

        let weekSection = buildWeekSection({
            sourceData: param_timetable,
            isFromStorage: false,
            startDate: weekDate
        });

        main_container.appendChild(weekSection);

        if (!main_status_timetable) main_status_timetable = [];
        main_status_timetable.push(convertWeekToStatus(weekSection));
    } catch (cwte) {
        alert(`An error occurred in creating new table: ${cwte}`);
    } finally {
        updateAttendanceStats();
        expand_latest_table();
    }
}

async function loadStoredTimetable(data_if_passed, is_onload, is_restoring_or_deleting) {
    try {
        if (!is_restoring_or_deleting) document.querySelector("input[name = 'status'][value = '']").checked = true;

        if (fts.style.display === 'block') fts.style.display = 'none';
        set_of_deleted = new Set();
        capitalizelatest();

        main_status_timetable = data_if_passed || await RetrieveData();
        main_status_timetable = validateAndTruncateData(main_status_timetable);

        main_container.innerHTML = '';
        main_container.style.display = 'table';

        if (!main_status_timetable || main_status_timetable.length === 0) return first();

        for (let weekTable of main_status_timetable) {
            if (weekTable.every(row => row[row.length - 1] === 'Delete')) continue;

            let weekSection = buildWeekSection({
                sourceData: weekTable,
                isFromStorage: true
            });

            main_container.appendChild(weekSection);
        }

        if (!document.querySelectorAll('.week-row').length) return first();

        for (let week of main_status_timetable) for (let row of week) if (row[row.length - 1] === 'Delete') set_of_deleted.add(row[0]);

        [First, change_date, attendance].forEach(el => el.style.display = 'none');
        [most_imp, imp].forEach(el => el.style.display = 'block');
        nav.style.display = 'flex';

        if (is_onload) setTimeout(() => window.scrollTo({ top: addweekbtn.getBoundingClientRect().top + window.pageYOffset - (window.innerHeight - addweekbtn.offsetHeight) + 20, behavior: 'instant' }), 1);
    } catch (lste) {
        return first(alert(`❌ Error loading data:\n${lste}`));
    } finally {
        if (!is_restoring_or_deleting) window.scrollTo({ top: addweekbtn.getBoundingClientRect().top + window.pageYOffset - (window.innerHeight - addweekbtn.offsetHeight) + 20, behavior: 'instant' });
        updateAttendanceStats();
    }
}

function convertpagetabletodictforlatest(weektable) {
    updateAttendanceStats();
    let weekData = {};
    let rows = weektable.querySelectorAll('.week-row');
    rows.forEach(row => {
        let day = row.querySelector('.day-cell').textContent;
        let periods = [];
        let periodCells = row.querySelectorAll('.period');
        periodCells.forEach(cell => periods.push(cell.textContent));
        weekData[day] = periods;
    });
    return weekData;
}

function copypagetablestatus(weektable) {
    updateAttendanceStats();
    let weekData = {};
    let rows = weektable.querySelectorAll('.week-row');
    rows.forEach(row => {
        let day = row.querySelector('.day-cell').textContent;
        let periods = [];
        let periodCells = row.querySelectorAll('.period');
        periodCells.forEach(cell => {
            let subject = cell.textContent;
            let periodStatus = '';

            if (cell.classList.contains('Present')) periodStatus = 'Present';
            else if (cell.classList.contains('Absent')) periodStatus = 'Absent';
            else if (cell.classList.contains('no-class')) periodStatus = 'no-class';

            if (!subject) periodStatus = '';
            periods.push({ [subject]: periodStatus });
        });
        weekData[day] = periods;
    });
    navigator.clipboard.writeText(JSON.stringify(weekData))
        .then(() => alert('Text copied to clipboard!'))
        .catch(error => alert(`Failed to copy: ${error}`));
}

function capitalizelatest() {
    latestTimetableMain.querySelectorAll('td').forEach(cell => {
        cell.textContent = cell.textContent.trim().substring(0, 100).toUpperCase();
        cell.onblur = () => cell.textContent = cell.textContent.trim().substring(0, 100).toUpperCase();
    });
}

function copylatestdict() {
    navigator.clipboard.writeText(JSON.stringify(convertlatesttodict()))
        .then(() => alert('Text copied to clipboard!'))
        .catch(error => alert(`Failed to copy: ${error}`));
}

function pastelatest() {
    try {
        let latestdata = prompt(`Enter latest timetable data (Dictionary, 2D array, or easy text format):\nFormat 1 (Dict style):Monday - WT, DBMS, ABC, XYZ; Tuesday - QWE, ETR, ETC\nFormat 2 (2D array style):WT, DBMS, ABC, XYZ; QWE, ETR, ETC\n\nOr directly enter in the format as you get from copying day wise latest timetable by pressing the 'Copy Latest Timetable' button.`);
        if (!latestdata) return alert(`No latest timetable data inputted by user ${user_name}`);

        try {
            latestdata = JSON.parse(latestdata.trim());
        } catch {
            latestdata = latestdata.trim();
            if (latestdata.includes('-')) {
                let tempDict = {};
                latestdata.split(';').map(x => x.trim()).filter(Boolean).forEach(dayEntry => {
                    let [day, subjectsStr] = dayEntry.split(/\s*-\s*/);
                    day = capitalizeFirst(day);
                    if (!day || !subjectsStr) return;
                    let subjectsArray = subjectsStr.split(',').map(s => s.trim()).filter(Boolean);
                    tempDict[day.trim()] = subjectsArray;
                });
                latestdata = tempDict;
            } else latestdata = latestdata.split(';').map(row => row.split(',').map(s => s.trim()).filter(Boolean)).filter(Boolean);
        }
        populateLatestFromDict(latestdata, 1);
    } catch (error) {
        alert(`An error occurred parsing your latest timetable data: ${error}`);
    } finally {
        capitalizelatest();
    }
}

function updatestatustoweektable(weektable) {
    try {
        let statusdata = prompt(`Enter weekdata status (Easy format example) :\nMonday: WT - absent, DBMS - present, DA - absent, ML - no class, ITCS, MINI PROJECT; Tuesday: DA, WTLAB, ML, DBMS - present\n\nOr enter directly in dictionary format as you get from copying day wise status of weektable by pressing the 'Copy Day Wise Status of weektable' button.`);
        if (!statusdata) return alert(`No weekdata status dictionary inputted by user ${user_name}`);

        try {
            statusdata = JSON.parse(statusdata.trim());
        } catch (e) {
            let statusdatatemp = {};
            statusdata.trim().split(';').map(x => x.trim()).filter(Boolean).forEach(dayEntry => {
                let [day, periodsStr] = dayEntry.split(':');
                day = capitalizeFirst(day);
                if (!day || !periodsStr) return;
                let periodsArray = periodsStr.split(',').map(p => p.trim()).filter(Boolean);

                statusdatatemp[day.trim()] = periodsArray.map(p => {
                    let [subject, status] = p.split(/\s*-\s*/);
                    subject = subject.trim();
                    status = status ? status.trim().toLowerCase() : '';
                    if (status === 'no class') status = 'no-class';
                    if (status && status !== 'no-class') status = status[0].toUpperCase() + status.slice(1);
                    return { [subject]: status };
                });
            });
            statusdata = statusdatatemp;
        }

        let rows = weektable.querySelectorAll('.week-row');

        for (let [day, periodsData] of Object.entries(statusdata)) {
            const row = Array.from(rows).find(r => r.querySelector('.day-cell')?.textContent.trim().toLowerCase() === day.toLowerCase());
            if (!row || !Array.isArray(periodsData)) continue;
            const periods = row.querySelectorAll('.period');

            for (let j = 0; j < Math.min(periods.length, periodsData.length); j++) {
                const cell = periods[j];
                const data = periodsData[j];

                if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
                    const key = Object.keys(data)[0];
                    const value = Object.values(data)[0];
                    cell.textContent = key ?? '';
                    cell.classList.remove('Present', 'Absent', 'no-class');
                    if (value) cell.classList.add(value);
                } else cell.textContent = String(data ?? '');
            }
        }
    } catch (error) {
        alert(`Error parsing weekdata status: ${error}`);
    } finally {
        updateAttendanceStats();
    }
}

function resetWeekTable(weekTable) {
    if (!weekTable) return;

    const rows = weekTable.querySelectorAll('.week-row');
    rows.forEach(row => {
        const periodCells = row.querySelectorAll('.period');
        periodCells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('Present', 'Absent', 'no-class');
            cell.style.backgroundColor = '';
        });
    });

    updateAttendanceStats();
}

function convertlatesttodict() {
    capitalizelatest();
    let rows = latestTimetableMain.querySelectorAll('tbody tr');
    let tableDict = {};

    rows.forEach(row => {
        let day = row.querySelector('th').textContent.trim();
        let periods = Array.from(row.querySelectorAll('td')).map(td => td.textContent.trim());
        tableDict[day] = periods;
    });

    return tableDict;
}

function populateLatestFromDict(tableData, is_paste) {
    try {
        if (!is_paste) resetlatest();
        if (!tableData) return;

        let tableDict;

        if (Array.isArray(tableData)) {
            tableDict = {};
            const numRows = tableData.length;

            const startDayIndex = numRows === 7 ? 0 : 1;

            for (let i = 0; i < numRows; i++) {
                const day = daysOfWeek[(startDayIndex + i) % 7];
                tableDict[day] = tableData[i];
            }
        } else tableDict = tableData;

        expand_latest_table();

        const rows = latestTimetableMain.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const day = row.querySelector('th').textContent.trim();
            const periods = tableDict[day];
            if (!periods) return;
            const cells = row.querySelectorAll('td');
            for (let i = 0; i < cells.length && i < periods.length; i++) cells[i].textContent = periods[i];
        });
    } catch (error) {
        alert(`An error occurred setting latest timetable: ${error}`);
    } finally {
        latest_timetable = tableData;
        capitalizelatest();
    }
}

function showlatest() {
    if (latest_btn.textContent === 'Show Latest Timetable') {
        latest_btn.textContent = 'Hide Latest Timetable';
        latestTimetable.style.display = 'block';
    }
    else {
        latest_btn.textContent = 'Show Latest Timetable';
        latestTimetable.style.display = 'none';
    }
    capitalizelatest();
}

function displaySubjects() {
    document.querySelectorAll('.date-cell').forEach(cell => {
        const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!datePattern.test(cell.textContent.trim())) cell.textContent = '01/01/1970';
    });
    document.querySelectorAll('.day-cell').forEach(cell => {
        if (!daysOfWeek.includes(cell.textContent.trim())) cell.textContent = daysOfWeek[1];
    });

    let uniquePeriodNames = new Set();
    const validClasses = ['Present', 'Absent', 'no-class', 'period', ''];
    document.querySelectorAll('.period').forEach(cell => {
        let periodName = cell.textContent.trim().substring(0, 100).toUpperCase();
        cell.textContent = periodName;

        Array.from(cell.classList).forEach(cls => {
            if (!validClasses.includes(cls)) cell.classList.remove(cls);
        });

        if (periodName === '') cell.classList.remove('Present', 'Absent', 'no-class');
        if (periodName) uniquePeriodNames.add(periodName);
    });

    uniquePeriodNames = Array.from(uniquePeriodNames);

    container.innerHTML = '';
    container.style.display = 'none';
    if (uniquePeriodNames.length === 0) return;
    container.style.display = 'grid';

    let title = document.createElement('h3');
    title.textContent = 'Unique Period Names (Click to Edit)';
    container.appendChild(title);
    uniquePeriodNames.forEach(name => {
        let nameContainer = document.createElement('div');
        let inputElement = document.createElement('input');
        inputElement.value = name;
        inputElement.setAttribute('data-original', name);

        inputElement.onfocus = (event) => event.target.setAttribute('data-original', event.target.value.trim().toUpperCase());

        inputElement.onblur = (event) => {
            let originalName = event.target.getAttribute('data-original');
            let newName = event.target.value.trim().substring(0, 100).toUpperCase();

            document.querySelectorAll('.period').forEach(cell => {
                if (cell.textContent === originalName) cell.textContent = newName;
            });

            event.target.setAttribute('data-original', newName);
            event.target.value = newName;

            updateAttendanceStats();
        };

        nameContainer.appendChild(inputElement);
        container.appendChild(nameContainer);
    });

    return uniquePeriodNames;
}

function updateAttendanceStats(event) {
    finalizedata();

    if (!periodtimingdatastructure || !Object.keys(periodtimingdatastructure).length) periodtimingdatastructure = {};
    generatePeriodTimingsForm();

    notes.value = notes_content = (notes_content ?? '').trim().replaceAll('<br>', '\n').slice(0, max_length_of_notes);

    show_dates_whose_notes_are_there();

    if (!document.querySelectorAll('.table-section').length) {
        add_date_notes.style.display = 'none';
        gen_date_notes.style.display = 'none';
        scroll_date_notes.style.display = 'none';
        input_dates_notes.style.display = 'none';
    } else {
        add_date_notes.style.display = 'inline';
        gen_date_notes.style.display = 'inline';
        scroll_date_notes.style.display = 'inline';
        input_dates_notes.style.display = 'inline';
    }

    if (!max_number_of_months) max_number_of_months = 12;
    if (!max_number_of_themes) max_number_of_themes = 12;
    if (!max_length_of_notes) max_length_of_notes = 40000;

    document.getElementById('max-time-html').textContent = `${max_number_of_months} months (${monthsData[max_number_of_months][0]} weeks)`;
    latestTimetableHeading.textContent = main_theme ? `Latest Timetable for Theme "${main_theme}" : ` : `Latest Timetable : `;
    notes_heading.textContent = main_theme ? `Theme "${main_theme}" Notes : ` : `Theme Notes : `;
    start_date_value.textContent = main_status_timetable?.[0]?.[0]?.[0] ?? '';
    end_date_value.textContent = start_date_value.textContent && getMaxAllowedSaturday(getMaxAllowedSunday(start_date_value.textContent));
    if (main_status_timetable?.[0]?.[0]?.[0]) start_end_show.style.display = 'inline';
    else start_end_show.style.display = '';

    if (event?.target?.id === 'attendance-btn') {
        if (attbtn.textContent === 'Display Attendance') {
            attbtn.textContent = 'Hide Attendance';
            attendance.style.display = 'block';
        } else {
            attbtn.textContent = 'Display Attendance';
            attendance.style.display = 'none';
            return;
        }
    } else {
        if (attbtn.textContent === 'Display Attendance') return;
        attendance.style.display = 'block';
    }

    const el = (tag, props = {}) => { let e = document.createElement(tag); Object.assign(e, props); return e; };
    const parseDMYToNum = dmy => {
        if (!dmy || typeof dmy !== 'string') return null;
        let parts = dmy.trim().split('/');
        if (parts.length !== 3) return null;
        let [dd, mm, yyyy] = parts.map(p => p.padStart(2, '0'));
        return Number(`${yyyy}${mm}${dd}`);
    };
    const parseISOToNum = iso => iso ? Number(iso.replaceAll('-', '')) : null;

    const dayNameOf = n => {
        let y = String(n).slice(0, 4), m = String(n).slice(4, 6), d = String(n).slice(6, 8);
        let dt = new Date(`${y}-${m}-${d}`);
        return dt.toLocaleDateString('en-IN', { weekday: 'long' });
    };
    const fmtWithDay = n => `${String(n).slice(6, 8)}/${String(n).slice(4, 6)}/${String(n).slice(0, 4)} (${dayNameOf(n)})`;
    const fmt = n => `${String(n).slice(6, 8)}/${String(n).slice(4, 6)}/${String(n).slice(0, 4)}`;

    const goToCell = (date, period) => {
        let target = null;

        document.querySelectorAll('.table-section .week-row').forEach(row => {
            let d = row.querySelector('.date-cell')?.textContent.trim();
            if (d !== date) return;

            let cells = row.getElementsByClassName('period');
            let cell = cells[period - 1];

            if (cell) target = cell;
        });

        if (!target) return alert(`Could not find Period ${period} on ${date}`);

        target.scrollIntoView({ behavior: 'instant', block: 'center' });
        target.style.outline = '5px solid purple';
        setTimeout(() => target.style.outline = '', 3200);
    };

    const jumpToSubject = sub_to_search => {
        let sub_att_items = document.querySelectorAll('.subject-attendance');
        let found = false;

        for (let sec of sub_att_items) {
            let name = sec.querySelector('.subject-name')?.textContent.trim() || '';

            if (name.toUpperCase() === sub_to_search.trim().toUpperCase()) {
                found = true;

                window.scrollTo({ top: (sec.querySelector('.subject-name').getBoundingClientRect().top + window.pageYOffset - 125), behavior: 'instant' });

                sec.style.outline = '8px solid purple';
                setTimeout(() => sec.style.outline = '', 3200);

                subjectSearchInput.value = '';
                subjectSuggestions.innerHTML = "";
                break;
            }
        }

        if (!found) alert(`Period '${sub_to_search.trim().toUpperCase()}' does not exist in your attendance!`);
    };

    const renderRanges = () => {
        rangesListContainer.innerHTML = '';

        if (ranges.length === 0) {
            let p = el('div');
            p.style.fontSize = '18px';
            p.textContent = 'No ranges applied — using entire data by default.';
            rangesListContainer.appendChild(p);
            computeAndRenderAttendance();
            return;
        }

        ranges.forEach((r, idx) => {
            let row = el('div');
            row.className = 'ranges-row';

            let label = el('div');
            label.textContent = `Applied Range →→ ${fmtWithDay(r.start)} → ${fmtWithDay(r.end)}`;

            let removeBtn = el('button');
            removeBtn.textContent = 'Remove';
            removeBtn.style.marginLeft = 'auto';
            removeBtn.onclick = () => {
                ranges.splice(idx, 1);
                renderRanges();
                computeAndRenderAttendance();
                presets.value = '';
            };

            row.appendChild(label);
            row.appendChild(removeBtn);
            rangesListContainer.appendChild(row);
        });
    };

    const tryAddRange = (startIso, endIso) => {
        let sNum = parseISOToNum(startIso);
        let eNum = parseISOToNum(endIso);

        if (!sNum || !eNum) return alert('Both start and end must be valid dates.');
        if (sNum > eNum) return alert('Start date must be <= end date.');

        if (sNum < globalMin || eNum > globalMax) return alert(`Selected range must be within:\n${fmtWithDay(globalMin)} → ${fmtWithDay(globalMax)}`);

        for (let r of ranges) if (!(eNum < r.start || sNum > r.end)) return alert(`New range overlaps existing range:\n${fmtWithDay(r.start)} → ${fmtWithDay(r.end)}`);

        ranges.push({ start: sNum, end: eNum });
        ranges.sort((a, b) => a.start - b.start);

        renderRanges();
        computeAndRenderAttendance();
    };

    const ddmmyyyy_to_ymd = s => {
        let [d, m, y] = s.split('/');
        return `${y}-${m}-${d}`;
    };

    const renderSubjectsInDatalist = () => {
        subjectDatalist.innerHTML = "";
        [...displaySubjects()].forEach(sub => {
            let opt = el("option");
            opt.value = sub;
            subjectDatalist.appendChild(opt);
        });
    };

    const computeAndRenderAttendance = () => {
        resultPlaceholder.innerHTML = '';

        let subjectsAttendance = {};
        let all_subjects = displaySubjects();
        if (!all_subjects) {
            resultPlaceholder.innerHTML = '<h3>There are absolutely NO Periods to display attendance of!</h3>';
            resultPlaceholder.style.backgroundColor = 'gray';
            return;
        }

        all_subjects.forEach(subject =>
            subjectsAttendance[subject] = {
                Present: 0,
                Absent: 0,
                CancelledClass: 0,
                NotMarkedClass: 0,
                totalClasses: 0,
                Attendance: 0,
                dates: []
            }
        );

        let overallAttendance = {
            totalPresent: 0,
            totalAbsent: 0,
            totalCancelledClass: 0,
            totalNotMarked: 0,
            totalClasses: 0,
            overallAttendancePercentage: 0
        };

        const inAnyRange = dateNum => {
            if (ranges.length === 0) return true;
            for (let r of ranges) if (dateNum >= r.start && dateNum <= r.end) return true;
            return false;
        };

        tableRows.forEach(tr => {
            if (!tr.dateNum) return;
            if (!inAnyRange(tr.dateNum)) return;

            tr.periodCells.forEach((cell, idx) => {
                let subject = cell.textContent.trim();
                if (!subject) return;

                let period = idx + 1;
                let status = '';

                if (cell.classList.contains('Present')) {
                    status = 'Present';
                    subjectsAttendance[subject].Present++;
                    overallAttendance.totalPresent++;
                } else if (cell.classList.contains('Absent')) {
                    status = 'Absent';
                    subjectsAttendance[subject].Absent++;
                    overallAttendance.totalAbsent++;
                } else if (cell.classList.contains('no-class')) {
                    status = 'no-class';
                    subjectsAttendance[subject].CancelledClass++;
                    overallAttendance.totalCancelledClass++;
                } else {
                    status = 'NotMarkedClass';
                    subjectsAttendance[subject].NotMarkedClass++;
                    overallAttendance.totalNotMarked++;
                }

                subjectsAttendance[subject].totalClasses++;
                overallAttendance.totalClasses++;

                subjectsAttendance[subject].dates.push({
                    date: tr.dateStr,
                    period,
                    status
                });
            });
        });

        for (let subject in subjectsAttendance) {
            let sad = subjectsAttendance[subject];
            let attended = sad.Present + sad.Absent;
            sad.Attendance = attended > 0 ? (sad.Present / attended) * 100 : 0;
        }

        let attendedOverall = overallAttendance.totalPresent + overallAttendance.totalAbsent;
        overallAttendance.overallAttendancePercentage = attendedOverall > 0 ? (overallAttendance.totalPresent / attendedOverall) * 100 : 0;

        let P = overallAttendance.totalPresent;
        let A = overallAttendance.totalAbsent;
        let C = overallAttendance.totalCancelledClass;
        let N = overallAttendance.totalNotMarked;

        let attendanceContainer = el('div');
        attendanceContainer.id = 'attendance-container';

        let summaryDiv = el('div');

        summaryDiv.innerHTML = `
            <h3>Overall Attendance Summary:</h3>
            <h3>Total Present: ${overallAttendance.totalPresent}</h3>
            <h3>Total Absent: ${overallAttendance.totalAbsent}</h3>
            <h3>Cancelled Classes: ${overallAttendance.totalCancelledClass}</h3>
            <h3>Not Marked: ${overallAttendance.totalNotMarked}</h3>
            <h3>Total Classes (including cancelled & not marked): ${overallAttendance.totalClasses}</h3>
        `;

        attendanceContainer.appendChild(summaryDiv);

        let overallHistoryContainer = el('div');
        let filterDiv = el('div');
        filterDiv.id = 'filter-div';

        const makeRadio = (name, value, text, checked = false) => {
            let lab = el('label');
            let inp = el('input');
            inp.type = 'radio';
            inp.name = name;
            inp.value = value;
            inp.checked = !!checked;
            inp.defaultChecked = !!checked;
            if (checked) inp.setAttribute('checked', 'checked');
            inp.style.marginRight = '4px';
            lab.appendChild(inp);
            lab.append(text);
            return { lab, inp };
        };

        let rNone = makeRadio('ovf', 'None', 'None', true);
        let rAll = makeRadio('ovf', 'All', 'All');
        let rP = makeRadio('ovf', 'Present', 'Present');
        let rA = makeRadio('ovf', 'Absent', 'Absent');
        let rNC = makeRadio('ovf', 'no-class', 'Class Cancelled');
        let rNM = makeRadio('ovf', 'NotMarkedClass', 'Status NOT Marked');

        [rNone.lab, rAll.lab, rP.lab, rA.lab, rNC.lab, rNM.lab].forEach(l => filterDiv.appendChild(l));
        overallHistoryContainer.appendChild(filterDiv);

        let ulOverall = el('ul');
        ulOverall.style.display = rNone.inp.checked ? 'none' : 'block';

        let overallList = [];
        for (let subject in subjectsAttendance) subjectsAttendance[subject].dates.forEach(d => overallList.push({ subject, ...d }));

        overallList.sort((a, b) => {
            let da = parseDMYToNum(a.date);
            let db = parseDMYToNum(b.date);

            if (da !== db) return da - db;
            return a.period - b.period;
        });

        overallList.forEach(item => {
            let oli = el('li');
            oli.dataset.status = item.status;

            let emoji =
                item.status === 'Present' ? "Present <span style = 'background:white;   border-radius:4px;'>✅</span>" :
                    item.status === 'Absent' ? "Absent <span style = 'background:white; border-radius:4px;'>❌</span>" :
                        item.status === 'no-class' ? "Class Cancelled <span style = 'background:white;  border-radius:4px;'>🚫</span>" : "Status NOT Marked <span style = 'background:white; border-radius:4px;'>⚪</span>";

            oli.innerHTML = `
                ${item.date} - Period ${item.period} (Subject - ${item.subject}): ${emoji}
                <button class = 'jump-btn'>Go to Cell</button>
            `;
            oli.querySelector('.jump-btn').onclick = () => goToCell(item.date, item.period);
            oli.style.marginBottom = '5px';
            ulOverall.appendChild(oli);
        });

        overallHistoryContainer.appendChild(ulOverall);
        attendanceContainer.appendChild(overallHistoryContainer);

        const overallHandler = evt => {
            let v = evt.target.value;
            if (v === 'None') { ulOverall.style.display = 'none'; return; }
            ulOverall.style.display = 'block';
            ulOverall.querySelectorAll('li').forEach(li => li.style.display = (v === 'All' || li.dataset.status === v) ? 'list-item' : 'none');
        };

        [rNone.inp, rAll.inp, rP.inp, rA.inp, rNC.inp, rNM.inp].forEach(radio => {
            radio.onchange = overallHandler;
            radio.onclick = e => overallHandler(e);
        });

        if ((P + A) > 0) {
            let msg = el('h3');
            msg.className = 'att-msg';
            msg.textContent = `Overall Attendance (excluding cancelled & not marked): ${overallAttendance.overallAttendancePercentage.toFixed(5)}%`;
            attendanceContainer.appendChild(msg);

            let pct = overallAttendance.overallAttendancePercentage;
            if (pct >= 75) attendanceContainer.style.backgroundColor = 'rgb(40, 250 ,80)';
            else if (pct >= 60) attendanceContainer.style.backgroundColor = 'rgb(250 ,200, 10)';
            else attendanceContainer.style.backgroundColor = 'rgb(250 ,64 ,80)';
        } else {
            attendanceContainer.style.backgroundColor = 'gray';
            let msg = el('h3');
            msg.className = 'att-msg';

            if (C === 0 && N === 0) msg.textContent = 'No classes recorded yet. Thus No Attendance to display.';
            else if (C > 0 && N === 0) msg.textContent = 'All classes were cancelled. Thus No Attendance to display.';
            else if (C === 0 && N > 0) msg.textContent = 'NO Marked Classes. Thus No Attendance to display.';
            else msg.textContent = 'All classes are either Cancelled or NOT marked. Thus No Attendance to display.';

            attendanceContainer.appendChild(msg);

            return resultPlaceholder.appendChild(attendanceContainer);
        }

        resultPlaceholder.appendChild(attendanceContainer);

        for (let subject in subjectsAttendance) {
            let sd = subjectsAttendance[subject];
            let subDiv = el('div');
            subDiv.className = 'subject-attendance';
            let safe = subject.replace(/\s+/g, '_').replace(/[^\w\-]/g, '');

            let header = el('div');
            header.innerHTML = `
                <h2 class = 'subject-name'>${subject}</h2>
                <h3>Present: ${sd.Present}</h3>
                <h3>Absent: ${sd.Absent}</h3>
                <h3>Cancelled: ${sd.CancelledClass}</h3>
                <h3>Not Marked: ${sd.NotMarkedClass}</h3>
                <h3>Total Classes: ${sd.totalClasses}</h3>
            `;
            subDiv.appendChild(header);

            let histCont = el('div');
            histCont.className = 'hist-cont';

            let fd = el('div');
            fd.className = 'fd';

            const mk = (name, val, txt, checked = false) => {
                let lab = el('label');
                let i = el('input');
                i.type = 'radio';
                i.name = name;
                i.value = val;
                i.checked = !!checked;
                i.defaultChecked = !!checked;
                if (checked) i.setAttribute('checked', 'checked');
                i.style.marginRight = '4px';
                lab.appendChild(i);
                lab.append(txt);
                return { lab, i };
            };

            let fAll = mk(`fs_${safe}`, 'All', 'All', true),
                fP = mk(`fs_${safe}`, 'Present', 'Present'),
                fA = mk(`fs_${safe}`, 'Absent', 'Absent'),
                fNC = mk(`fs_${safe}`, 'no-class', 'Cancelled'),
                fNM = mk(`fs_${safe}`, 'NotMarkedClass', 'Not Marked');

            [fAll.lab, fP.lab, fA.lab, fNC.lab, fNM.lab].forEach(l => fd.appendChild(l));
            histCont.appendChild(fd);

            let ul = el('ul');
            sd.dates.forEach(sdfe => {
                let sli = el('li');
                sli.dataset.status = sdfe.status;

                let emojiText =
                    sdfe.status === 'Present' ? "Present <span style = 'background:white;  border-radius:4px;'>✅</span>" :
                        sdfe.status === 'Absent' ? "Absent <span style = 'background:white;    border-radius:4px;'>❌</span>" :
                            sdfe.status === 'no-class' ? "Cancelled <span style = 'background:white;   border-radius:4px;'>🚫</span>" : "Not Marked <span style = 'background:white;  border-radius:4px;'>⚪</span>";

                sli.innerHTML = `
                    ${sdfe.date} - Period ${sdfe.period} : ${emojiText}
                    <button class = 'jump-btn'>Go to Cell</button>
                `;

                sli.querySelector('.jump-btn').onclick = () => goToCell(sdfe.date, sdfe.period);

                ul.appendChild(sli);
            });

            histCont.appendChild(ul);
            subDiv.appendChild(histCont);

            const subjectHandler = evt => {
                let v = evt.target.value;
                ul.querySelectorAll('li').forEach(li => li.style.display = (v === 'All' || li.dataset.status === v) ? 'list-item' : 'none');
            };

            [fAll.i, fP.i, fA.i, fNC.i, fNM.i].forEach(r => {
                r.onchange = subjectHandler;
                r.onclick = e => subjectHandler(e);
            });

            fAll.i.dispatchEvent(new Event('change'));

            let sP = sd.Present, sA = sd.Absent, sC = sd.CancelledClass, sN = sd.NotMarkedClass;

            let msg = el('h3');
            msg.className = 'att-msg';

            if ((sP + sA) > 0) {
                msg.textContent = `Overall Attendance (excluding cancelled & not marked): ${sd.Attendance.toFixed(5)}%`;
                if (sd.Attendance >= 75) subDiv.style.background = 'rgb(40, 250 ,80)';
                else if (sd.Attendance >= 60) subDiv.style.background = 'rgb(250 ,200, 10)';
                else subDiv.style.background = 'rgb(250 ,64 ,80)';
            } else {
                subDiv.style.background = 'gray';
                if (sC === 0 && sN === 0) msg.textContent = 'No Classes Recorded for this subject. No attendance to display.';
                else if (sC > 0 && sN === 0) msg.textContent = 'All classes are Cancelled. No attendance to display.';
                else if (sC === 0 && sN > 0) msg.textContent = 'NO Marked Classes.Thus No Attendance to display.';
                else msg.textContent = 'All classes are either Cancelled or NOT marked. No Attendance to display.';
            }

            subDiv.appendChild(msg);
            resultPlaceholder.appendChild(subDiv);
        }
    };

    attendance.innerHTML = '';
    attendance.style.backgroundColor = '';

    let allRowDates = [];
    let tableRows = [];

    document.querySelectorAll('.table-section').forEach(weekTable => {
        weekTable.querySelectorAll('.week-row').forEach(row => {
            let dateStr = (row.querySelector('.date-cell') || {}).textContent || '';
            let dateNum = parseDMYToNum(dateStr);
            if (dateNum) allRowDates.push(dateNum);

            let periodCells = Array.from(row.getElementsByClassName('period'));

            tableRows.push({ dateStr, dateNum, periodCells, row });
        });
    });

    if (tableRows.length === 0) {
        attendance.innerHTML = '<h3>There are absolutely NO Periods to display attendance of!</h3>';
        attendance.style.backgroundColor = 'gray';
        return;
    }

    let globalMin = Math.min(...allRowDates);
    let globalMax = Math.max(...allRowDates);

    let controls = el('div');
    controls.id = 'controls';

    let startInput = el('input');
    startInput.type = 'date';
    startInput.value = ddmmyyyy_to_ymd(fmt(globalMin));

    let endInput = el('input');
    endInput.type = 'date';
    endInput.value = ddmmyyyy_to_ymd(fmt(globalMax));

    let addBtn = el('button'); addBtn.textContent = 'Add Range';
    let clearAllBtn = el('button'); clearAllBtn.textContent = 'Clear All';

    let presets = el('select');
    presets.style.marginLeft = '4px';
    presets.innerHTML = `
        <option value = ''>Presets</option>
        <option value = 'last3'>Last 3 days</option>
        <option value = 'last7'>Last 7 days</option>
        <option value = 'last15'>Last 15 days</option>
        <option value = 'last30'>Last 30 days</option>
        <option value = 'last60'>Last 60 days</option>
    `;

    controls.appendChild(startInput);
    controls.appendChild(endInput);
    controls.appendChild(addBtn);
    controls.appendChild(clearAllBtn);
    controls.appendChild(presets);

    let rangeManager = el('div');
    rangeManager.id = 'range-manager';

    let title = el('h3');
    title.style.fontWeight = '800'
    title.textContent = 'Filter Attendance — Multiple Date Ranges (Inclusive)';

    let bounds = el('div');
    bounds.style.fontSize = '18px';
    bounds.textContent = `Data range available: ${fmtWithDay(globalMin)} → ${fmtWithDay(globalMax)}`;

    let rangesListContainer = el('div');
    rangesListContainer.id = 'ranges-list-container';

    let subjectSearchInput = el('input');
    subjectSearchInput.id = 'subject-search-input';
    subjectSearchInput.placeholder = "Type period name to jump to (Press ENTER key to jump)";
    subjectSearchInput.autocomplete = "off";

    subjectSearchInput.onkeydown = sskde => {
        if (sskde.key === "Enter") {
            jumpToSubject(subjectSearchInput.value);
            subjectSearchInput.blur();
        }
    };

    subjectSearchInput.onblur = () => subjectSearchInput.value = '';

    let subjectDatalist = el('datalist');
    subjectDatalist.id = 'subject-list';

    subjectSearchInput.setAttribute("list", "subject-list");

    rangeManager.appendChild(subjectSearchInput);
    rangeManager.appendChild(subjectDatalist);
    rangeManager.appendChild(title);
    rangeManager.appendChild(bounds);
    rangeManager.appendChild(controls);
    rangeManager.appendChild(rangesListContainer);

    attendance.appendChild(rangeManager);

    let resultPlaceholder = el('div');
    resultPlaceholder.id = 'attendance-result-placeholder';
    attendance.appendChild(resultPlaceholder);

    let ranges = [];

    addBtn.onclick = () => tryAddRange(startInput.value, endInput.value);

    clearAllBtn.onclick = () => {
        ranges = [];
        renderRanges();
        computeAndRenderAttendance();
    };

    presets.onchange = () => {
        const toISO = d => d.toISOString().slice(0, 10);
        const parseISO = n => new Date(`${String(n).slice(0, 4)}-${String(n).slice(4, 6)}-${String(n).slice(6, 8)}`);

        let v = presets.value;
        let endDate = parseISO(globalMax);
        let startDate = new Date(endDate);

        if (v === 'last3') startDate.setDate(endDate.getDate() - 3);
        else if (v === 'last7') startDate.setDate(endDate.getDate() - 7);
        else if (v === 'last15') startDate.setDate(endDate.getDate() - 15);
        else if (v === 'last30') startDate.setDate(endDate.getDate() - 30);
        else if (v === 'last60') startDate.setDate(endDate.getDate() - 60);

        if (startDate < parseISO(globalMin)) startDate = parseISO(globalMin);

        ranges = [];
        renderRanges();

        tryAddRange(toISO(startDate), toISO(endDate));
        presets.value = '';
    };

    renderRanges();
    renderSubjectsInDatalist();
    computeAndRenderAttendance();
}

function updateDayRowStatus(date, callback) {
    for (let i = 0; i < main_status_timetable.length; i++) {
        for (let j = 0; j < main_status_timetable[i].length; j++) {
            let dayrow = main_status_timetable[i][j];
            if (dayrow[0] === date) {
                callback(dayrow, i, j);
                return true;
            }
        }
    }
    return false;
}

function syncPeriodData(dayrow, periodCells) {
    for (let k = 2; k < dayrow.length - 1; k++) {
        let cell = periodCells[k - 2];
        let name = cell.textContent.substring(0, 100);
        let status = '';

        if (cell.classList.contains('Present')) status = 'Present';
        else if (cell.classList.contains('Absent')) status = 'Absent';
        else if (cell.classList.contains('no-class')) status = 'no-class';
        if (!name) status = '';

        dayrow[k] = { [name]: status };
    }
}

function deleteAllWeek(weekTable) {
    let rows = weekTable.querySelectorAll('.week-row');
    let rowdates = [...rows].map(r => r.querySelector('.date-cell').textContent);

    for (let k = 0; k < rowdates.length; k++) {
        let date = rowdates[k];
        let periods = rows[k].querySelectorAll('.period');

        updateDayRowStatus(date, dayrow => {
            dayrow[dayrow.length - 1] = 'Delete';
            syncPeriodData(dayrow, periods);
            set_of_deleted.add(dayrow[0]);
        });
    }
    loadStoredTimetable(main_status_timetable, undefined, 1);
}

function deleteDay(cell) {
    let row = cell.closest('.week-row');
    let date = row.querySelector('.date-cell').textContent;
    let periods = row.querySelectorAll('.period');

    updateDayRowStatus(date, dayrow => {
        dayrow[dayrow.length - 1] = 'Delete';
        syncPeriodData(dayrow, periods);
        set_of_deleted.add(dayrow[0]);
    });
    loadStoredTimetable(main_status_timetable, undefined, 1);
}

function finalizedata() {
    displaySubjects();
    let weekRows = document.querySelectorAll('.week-row');
    if (!main_status_timetable || main_status_timetable.length === 0) return;

    for (let k = 0; k < weekRows.length; k++) {
        let rownode = weekRows[k];
        let date = rownode.querySelector('.date-cell').textContent;
        let periods = rownode.querySelectorAll('.period');

        updateDayRowStatus(date, dayrow => syncPeriodData(dayrow, periods));
    }
    return main_status_timetable;
}

function if_there_already(date_to_check) {
    return updateDayRowStatus(date_to_check, dayrow => {
        dayrow[dayrow.length - 1] = 'Normal';
        set_of_deleted.delete(date_to_check);
    });
}

function restore(deletedrowdate) {
    updateDayRowStatus(deletedrowdate, dayrow => {
        dayrow[dayrow.length - 1] = 'Normal';
        set_of_deleted.delete(dayrow[0]);
        loadStoredTimetable(main_status_timetable, undefined, 1);
    });
    updateExistingPopup();
}

function convertWeekToStatus(weekTable) {
    let weekData = [];
    let rows = weekTable.querySelectorAll('.week-row');
    rows.forEach(row => {
        let rowData = convertRowToStatus(row);
        if (!if_there_already(rowData[0])) weekData.push(rowData);
    });
    return weekData;
}

function convertRowToStatus(row) {
    updateAttendanceStats();
    let rowData = [];

    let dateValue = row.querySelector('.date-cell').textContent;
    let dayValue = row.querySelector('.day-cell').textContent;

    rowData.push(dateValue || '');
    rowData.push(dayValue || '');

    let periodCells = row.querySelectorAll('.period');
    periodCells.forEach(periodCell => {
        let periodName = periodCell.textContent;
        let periodStatus = '';

        if (periodCell.classList.contains('Present')) periodStatus = 'Present';
        else if (periodCell.classList.contains('Absent')) periodStatus = 'Absent';
        else if (periodCell.classList.contains('no-class')) periodStatus = 'no-class';

        rowData.push({ [periodName]: periodStatus });
    });
    if (set_of_deleted.has(dateValue)) rowData.push('Delete');
    else rowData.push('Normal')
    return rowData;
}

function getDayInt(dateStr) {
    let date;

    if (dateStr.includes('/')) {
        let parts = dateStr.split('/');
        date = new Date(parts[2], parts[1] - 1, parts[0]);
    } else if (dateStr.includes('-')) date = new Date(dateStr);
    else throw new Error('Unsupported date format');

    return date.getDay();
}

function displaypopupcontent() {
    let content = document.createElement('div');
    content.id = 'content-popup';
    content.innerHTML = `<h2>Deleted Items</h2>
    <h3>Note: If a row is deleted but the row is regenerated using Add Week button, it will be removed from the list of deleted rows and cannot be restored in its original form anymore</h3>
    <h4>List of deleted dates/weeks will appear here...</h4><br>`;

    for (let date of set_of_deleted) {
        let para = document.createElement('p');

        let restore_button = document.createElement('button');
        restore_button.className = 'restore-deleted';
        restore_button.textContent = 'Restore';
        restore_button.dataset.date = date;

        let textNode = document.createTextNode(` [${date}] (${daysOfWeek[getDayInt(date)]})`);

        para.appendChild(restore_button);
        para.innerHTML += '&emsp;';
        para.appendChild(textNode);

        content.appendChild(para);
        content.appendChild(document.createElement('br'));
    }

    return content;
}

function openPopup() {
    if (set_of_deleted.size === 0) return alert("NO Deleted Rows to Show and Restore!");

    document.getElementById('popup')?.remove();
    document.getElementById('popup-overlay')?.remove();

    let overlay = document.createElement('div');
    overlay.id = 'popup-overlay';
    document.body.appendChild(overlay);

    let popup = document.createElement('div');
    popup.id = 'popup';

    let closeButton = document.createElement('span');
    closeButton.id = 'close-popup';
    closeButton.innerHTML = '&times;';
    closeButton.onclick = closePopup;

    popup.appendChild(closeButton);

    let content = displaypopupcontent();
    popup.appendChild(content);
    document.body.appendChild(popup);

    attachRestoreHandlers();
}

function updateExistingPopup() {
    if (set_of_deleted.size === 0) return closePopup();

    let old = document.getElementById('content-popup');
    if (!old) return;

    let fresh = displaypopupcontent();
    old.replaceWith(fresh);

    attachRestoreHandlers();
}

function closePopup() {
    document.getElementById('popup')?.remove();
    document.getElementById('popup-overlay')?.remove();
}

function downloadAsJSON() {
    try {
        if (!uid || !user_name) return alert('No user logged in, cannot download data! Please login first.');
        
        if (!main_theme) {
            let input_theme = prompt('Enter a theme name for your attendance data before you can download it:')?.trim();
            if (!input_theme) return alert(`No theme name provided by user ${user_name}. Cannot download data!`);
            if (list_of_themes.has(input_theme)) return alert('This theme already exists. Please enter a different name to set as theme!');
            if (invalidChars.some(char => input_theme.includes(char))) return alert(`❌ Invalid theme name "${input_theme}". Please avoid using characters ${invalidChars}`);
            if (input_theme.length > 100) alert("Theme too long, trimming to 100 characters");
            main_theme = input_theme.slice(0, 100);
            theme_in_html.textContent = main_theme;
            let tct = formatCustomDate(new Date());
            db.set({ [`${main_theme} theme_creation_time`]: tct }, { merge: true }).then(() => { created_theme_name.textContent = main_theme; theme_creation_time.textContent = tct; }).catch(error => alert(`❌ Error saving theme creation time to backend: ${error}`));
        }
        
        updateAttendanceStats();
        let status_timetable = finalizedata();
        if (Array.isArray(status_timetable) && status_timetable.length === 0) return;
        let data_to_download = [];
        data_to_download.push(status_timetable);
        data_to_download.push(convertlatesttodict());
        data_to_download.push(notes.value.trim().slice(0, max_length_of_notes));
        data_to_download.push(periodtimingdatastructure);
        let jsonString = JSON.stringify(data_to_download, null, 4);
        let blob = new Blob([jsonString], { type: 'application/json' });
        let link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${(window.location.host + window.location.pathname).replace(/\/+$/, '').replace(/\//g, '_')}, User ${user_name}, Theme ${main_theme}, On ${formatCustomDate(new Date(), 1)}.json`;
        link.click();
        URL.revokeObjectURL(link.href);
    }
    catch (downloaderror) { alert(`Failed to download attendance data for user ${user_name} for theme ${main_theme} due to ${downloaderror}`); }
}