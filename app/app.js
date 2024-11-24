App = {
    contracts: {},
    load: async () => {
        await App.loadWeb3();
        await App.loadAccount();
        await App.loadContract();
        await App.render();
    },
    loadWeb3: async () => {
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        }
    },
    loadAccount: async () => {
        App.account = (await web3.eth.getAccounts())[0];
    },
    loadContract: async () => {
        const taskChain = await $.getJSON('TaskChain.json');
        App.contracts.TaskChain = TruffleContract(taskChain);
        App.contracts.TaskChain.setProvider(App.web3Provider);
        App.taskChain = await App.contracts.TaskChain.deployed();
    },
    createTask: async () => {
        const name = $('#taskName').val();
        const description = $('#taskDesc').val();
        const deadline = new Date($('#taskDeadline').val()).getTime() / 1000;
        await App.taskChain.createTask(name, description, deadline, { from: App.account });
        window.location.reload();
    },
    render: async () => {
        const taskCount = await App.taskChain.taskCount();
        let taskTemplate = '';
        for (let i = 1; i <= taskCount; i++) {
            const task = await App.taskChain.tasks(i);
            taskTemplate += `<div>${task.name} - ${task.description} - ${new Date(task.deadline * 1000).toLocaleDateString()} - ${task.completed ? "Selesai" : "Belum Selesai"}</div>`;
        }
        $('#tasks').html(taskTemplate);
    }
};

$(() => {
    $(window).load(() => {
        App.load();
    });
});
