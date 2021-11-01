import App from './App';

const { app, port } = App;

app.listen(port, () => { console.log(`Server is running on port ${port}`); });
