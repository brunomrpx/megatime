var MegaTime = function(properties) {
    var saveMarkButton = document.querySelector('#save-mark');
    var addPointButton = document.querySelector('#add-point');
    var clearPointsButton = document.querySelector('#clear-points');
    var pointsTable = document.querySelector('#points-table');
    var markElement = document.querySelector('#mark');
    var nextPointElement = document.querySelector('#next-point');
    var totalPointsElement = document.querySelector('#total-points');
    var remainderTimeElement = document.querySelector('#remainder-time');

    saveMarkButton.addEventListener('click', saveMark);
    addPointButton.addEventListener('click', addPoint);
    clearPointsButton.addEventListener('click', clearPoints);

    renderAll();

    function dateDiff(dateInput1, dateInput2) {
        var date1 = new Date(null, null, null, dateInput1.getHours(), dateInput1.getMinutes());
        var date2 = new Date(null, null, null, dateInput2.getHours(), dateInput2.getMinutes());
        var diff = Date.parse(date1) - Date.parse(date2); 

        return isNaN( diff ) ? NaN : {
            diff: diff,
            miliseconds: Math.floor(diff % 1000),
            seconds: Math.floor(diff / 1000 % 60),
            minutes: Math.floor(diff / 60000 % 60),
            hours: Math.floor(diff / 3600000 % 24),
            days: Math.floor(diff / 86400000)
        };
    }
    
    function renderMarkValue() {
        var markValue = getMarkValue();
        if (markValue) {
            markElement.value = markValue;
        }
    }

    function getMarkValue() {
        return localStorage.getItem('markValue');
    }

    function clearPoints() {
        if (!confirm('Deseja deletar todas as marcações?')) {
            return;
        }
        localStorage.removeItem('points');
        localStorage.removeItem('totalPoints');
        renderAll();
    }


    function saveMark() {
        if(!confirm('Deseja salvar uma nova meta?')) {
            renderMarkValue();
            return;
        }

        var newMarkValue = markElement.value; 
        localStorage.setItem('markValue', newMarkValue);
        renderAll();
    }

    function renderAll() {
        renderMarkValue();
        renderPoints();
        renderNextPoint();
        renderTotalPoints();
        renderRemainderTime();
    }

    function getPoints() {
        return JSON.parse(localStorage.getItem('points')) || Array();
    }

    function renderRemainderTime() {
        var remainderTime = getRemainderTime();
        var markValue = getMarkValue();
        var formatedRemainderTime;

        if (!remainderTime) {
            if (markValue) {
                remainderTime = splitTime(getMarkValue());
            } else {
                remainderTime = {
                    hours: '00',
                    minutes: '00'
                };
            }
        }

        formatedRemainderTime = remainderTime.hours + ':' + remainderTime.minutes;
        remainderTimeElement.value = formatTime(formatedRemainderTime); 
    }

    function getRemainderTime() {
        var totalPoints = splitTime(getTotalPoints());
        var markValue = splitTime(getMarkValue());
        var markValueDate = new Date(null, null, null, markValue.hours, markValue.minutes);
        var totalPointsDate = new Date(null, null, null, totalPoints.hours, totalPoints.minutes);

        return dateDiff(markValueDate, totalPointsDate);
    }

    function renderNextPoint() {
        var lastPoint = getLastItem(getPoints());
        var nextPoint;
        var remainderTime = getRemainderTime();
        var formatedNextPoint;

        if (!lastPoint || hasEnd(lastPoint)) {
            nextPointElement.value = '--';
            return;
        }

        nextPoint = new Date(lastPoint.begin);
        nextPoint.setHours(nextPoint.getHours() + remainderTime.hours);
        nextPoint.setMinutes(nextPoint.getMinutes() + remainderTime.minutes);
        formatedNextPoint = formatTime(nextPoint.getHours() + ':' + nextPoint.getMinutes());
        nextPointElement.value = formatedNextPoint;
    }

    function formatTime(time) {
        var formatedTime;
        time = splitTime(time);
        time.hours = addZeroLeft(time.hours);
        time.minutes = addZeroLeft(time.minutes);
        formatedTime = time.hours + ':' + time.minutes;

        function addZeroLeft(value) {
            return value <= 9 ? '0' + '' + value : value;
        }

        return formatedTime;
    }

    function splitTime(time) {
        var timeParts = time.split(':');

        return {
            hours: timeParts[0],
            minutes: timeParts[1]
        }
    }

    function getTotalPoints() {
        return localStorage.getItem('totalPoints') || '00:00';
    }

    function renderTotalPoints() {
        var points = getPoints();
        var dateAux = new Date(null, null, null, 0, 0) ;
        var diffResult;
        var mark;
        var totalPoints;

        if (points.length === 0) {
            totalPointsElement.value = '00:00';
            return;
        }

        points.forEach(function(point) {
            if (!hasEnd(point)) {
                return;
            }

            diffResult = dateDiff(new Date(point.end), new Date(point.begin));
            dateAux.setHours(dateAux.getHours() + diffResult.hours, dateAux.getMinutes() + diffResult.minutes);
        });
        
        totalPoints = dateAux.getHours() + ':' + dateAux.getMinutes();
        totalPointsElement.value = formatTime(totalPoints);

        localStorage.setItem('totalPoints', totalPoints);
    }

    function renderPoints() {
        var points = getPoints();
        var pointsTableBody = pointsTable.querySelector('tbody');
        var pointsTime;
        var tr;
        var td;
        var point;
        var property;
        var diffResult;

        pointsTableBody.innerHTML = '';

        points.forEach(function(point) {
            tr = document.createElement('tr');
            for (property in point) {
                propertyDate = new Date(point[property]);
                td = document.createElement('td');
                td.innerHTML = propertyDate.getHours() + ':' + propertyDate.getMinutes();
                tr.appendChild(td);
            }

            pointsTableBody.appendChild(tr);
        }); 
    }

    function hasEnd(point) {
        return Object.keys(point).length == 2;
    }

    function getLastItem(array) {
        return array[array.length - 1];
    }

    function addPoint(){        
        if(!confirm('Deseja inserir uma nova marcação?')) {
            return;
        }

        var markValue = getMarkValue();
        if (!markValue) {
            alert('Você deve inserir uma meta');
            return;
        }

        var now = new Date();
        var points = getPoints();
        var lastPoint;

        try {
            lastPoint = getLastItem(points);

            if (hasEnd(lastPoint)) {
                insertBeginPoint();
            } else {
                insertEndPoint();
            }
        } catch (error) {
            insertBeginPoint();
        } finally {
            renderAll();
        }

        function insertBeginPoint() {
            points.push({'begin': now});
            localStorage.setItem('points', JSON.stringify(points));
        }

        function insertEndPoint() {
            lastPoint.end = now;
            localStorage.setItem('points', JSON.stringify(points));
        }
    }
}
