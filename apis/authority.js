const express = require('express');
const router = express.Router();
const myModel = require('../modules/authorizedUser');
const userModel = require('../modules/commenters');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Local Strorage
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}


// MiddleWare
function checkloginuser(req, res, next) {
    var userToken = localStorage.getItem('userToken');
    try {
        if (req.session.userID) {
            var decoded = jwt.verify(userToken, 'Login Token');

        } else {

            res.redirect('/viewmessage');
        }
    } catch (err) {
    }
    next();
}


//Login Section
router.get('/login', (req, res) => {
    var loggedin = localStorage.getItem('LoginUser');
    if (req.session.userID) {
        res.redirect('/mymessage')
    } else {
        res.render('login', { title: "Login", msg: '', header: 'Enter Password' });
    }
});
router.post('/login', function (req, res, next) {
    var password = req.body.password;
    var checkUser = myModel.findOne({ PhoneNo: '8144607288' });
    checkUser.exec((err, data) => {
        if (err) throw err;
        if (data != null || data != undefined) {
            var name = data.Name;
            var getUserID = data._id;
            var getPasword = data.Password;
            if (bcrypt.compareSync(password, getPasword)) {
                var token = jwt.sign({ userId: getUserID }, 'Login Token');
                localStorage.setItem('userToken', token);
                localStorage.setItem('LoginUser', name);
                req.session.userID = name;
                res.redirect('/mymessages');
            } else {
                res.render('login', { title: "Login", msg: 'Password not matched', header: 'Enter Password' });
            }
        } else {
            res.render('login', { title: "Login", msg: 'You are not allow to access this section', header: 'Enter Password' });
        }
    });
});




//Passward Change Section
router.get('/changepassword', (req, res) => {
    res.render('accountVerifier', { title: 'Reset Password', msg: '', header: 'Enter Your Phone Number' });
});
router.post('/verifyingAccount', (req, res) => {
    let account = req.body.phone;
    var checkUser = myModel.findOne({ PhoneNo: account });
    checkUser.exec((err, data) => {
        if (err) throw err;
        if (data != null || data != undefined) {
            res.render('changePassword', { title: 'Reset Password', msg: '', header: 'Change your Password', record: data });
        } else {
            res.render('accountVerifier', { title: 'Reset Password', msg: 'Account Number not Matched', header: 'Enter Your Phone Number' });
        }
    });
});
router.post('/changepassword', (req, res) => {

    let account = req.body.phone;
    let password = bcrypt.hashSync(req.body.password, 7);
    var checkUser = myModel.findOneAndUpdate({ PhoneNo: account }, {
        Password: password
    });
    checkUser.exec(function (err, data) {
        if (err) throw err;
        res.render('changePassword', { title: 'Reset Password', msg: '', header: 'Your Password is changed', record: '' });
    });
});







//Message section
router.get('/mymessages', checkloginuser, (req, res) => {
    let message = userModel.find({});
    message.exec((err, data) => {
        if (err) throw err;
        res.render('message', { title: "MKM's Message", msg: data });
    });
});
router.get('/mymessages/delete/:id', function (req, res, next) {
    var message_id = req.params.id;
    var delete_message = userModel.findByIdAndDelete(message_id);
    delete_message.exec((err, data) => {
        if (err) throw err;
        res.redirect('/mymessages');
    });
});

//Logout
router.get('/logout', function (req, res, next) {

    req.session.destroy(function (err) {
        if (err) {
            res.redirect('/');

        }
    })
    localStorage.removeItem('userToken');
    localStorage.removeItem('LoginUser');
    res.redirect('/');
});


//Data Fetching

router.get('/messageSchema', (req, res) => {
    let message = userModel.find({});
    message.exec((err, data) => {
        if (err) throw err;
        res.send(data);
    });
});

module.exports = router;