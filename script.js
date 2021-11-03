const app = {};

app.collatzArray = [];
app.form = document.querySelector('.input-form');
app.number = document.querySelector('#user-number');

app.submitHandler = () => {

    app.form.addEventListener('submit', (e) => {
        app.collatzArray = [];
        e.preventDefault();
        const firstNum = parseInt(app.number.value);

        app.collatzArray.push(firstNum);
        app.nextNum(firstNum);
    });

}

app.displayCollatz = () => {
    const chartContainer = document.querySelector('.collatz-chart-container');

    chartContainer.innerHTML = '<canvas id="collatz-chart" max-width="400" max-height="800"></canvas>';
    const labelArray = [];

    for (let i = 1; i <= app.collatzArray.length; i++) {
        labelArray.push(i);
    }
    // Chart js config
    const labels = labelArray;
    const data = {
        labels: labels,
        datasets: [{
            label: 'Value',
            data: [...app.collatzArray],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Number in Series',
                        font: {
                            size: 20
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Term Value',
                        font: {
                            size: 20
                        }
                    }
                },
            }
        }
    };

    const myChart = new Chart(
        document.getElementById('collatz-chart'),
        config
    );
};


// Recursive function to grab the next number until it loops indefinitely 
app.nextNum = (previousNumber) => {
    let nextNumber = 0;

    if (previousNumber % 2 === 0) {
        nextNumber = previousNumber / 2;
    } else {
        nextNumber = previousNumber * 3 + 1;
    }

    if (app.collatzArray.length > 6) {
        if (app.collatzCatch(app.collatzArray.length - 1) === false) {
            app.collatzArray.push(nextNumber);
            app.nextNum(nextNumber);
        } else {
            app.displayCollatz();
        }
    } else {
        app.collatzArray.push(nextNumber);
        app.nextNum(nextNumber);
    }
}

// Catch statement if the last 6 numbers have looped. It will only loop at 4 2 1 and then it will loop indefinitely.
app.collatzCatch = (lastNum) => {
    if (app.collatzArray[lastNum] === app.collatzArray[lastNum - 3] &&
        app.collatzArray[lastNum - 1] === app.collatzArray[lastNum - 4] &&
        app.collatzArray[lastNum - 2] === app.collatzArray[lastNum - 5]
    ) {
        return true;
    } else {
        return false;
    }
};

app.init = () => {
    app.submitHandler();
};

app.init();