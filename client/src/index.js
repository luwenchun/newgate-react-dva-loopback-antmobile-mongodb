import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/log_in'))
app.model(require('./models/homepage'));
app.model(require('./models/indexs'));
app.model(require('./models/mall/cart'))
app.model(require('./models/mall/product'))


app.model(require('./models/mall/mainMall'));
app.model(require('./models/mall/myshop'));

app.model(require('./models/mall/adsRule'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
