if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const PORT = process.env.PORT || 5000;

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')



const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

const users = []

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use( express.static( "public" ) );


app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name })
})





app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})


app.get('/nav', checkAuthenticated, (req, res) => {
  res.render('nav.ejs')
})
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})
app.get('/footer', checkNotAuthenticated, (req, res) => {
  res.render('footer.ejs')
})


app.get('/nav', checkNotAuthenticated, (req, res) => {
  res.render('nav.ejs')
})

app.get('/publicnav', checkNotAuthenticated, (req, res) => {
  res.render('publicnav.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})

app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/home')
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}
    
app.get('/archives', checkAuthenticated, (req, res) => {
    res.render('archives.ejs')
  })


  


app.get('/stories', checkAuthenticated, (req, res) => {
  res.render('stories.ejs')
})


app.get('/upload', checkAuthenticated, (req, res) => {
  res.render('upload.ejs')
})


app.get('/contact', checkAuthenticated, (req, res) => {
  res.render('contact.ejs')
})

app.get('/community', checkAuthenticated, (req, res) => {
  res.render('community.ejs')
})

app.get('/uservid', checkAuthenticated, (req, res) => {
  res.render('uservid.ejs')
})

app.get('/stories', checkAuthenticated, (req, res) => {
  res.render('stories.ejs')
})

app.get('/reporter', checkAuthenticated, (req, res) => {
  res.render('reporter.ejs')
  

  })
  
  
  app.get('/headshop', checkAuthenticated, (req, res) => {
    res.render('headshop.ejs')
  })
  app.get('/cart', checkAuthenticated, (req, res) => {
    res.render('cart.ejs')
  })
  app.get('/headshop', checkAuthenticated, (req, res) => {
    res.render('headshop.ejs')
  })
  
  app.get('/home', checkAuthenticated, (req, res) => {
    res.render('headshop.ejs')
  })

  
 app.get('/livestream', checkAuthenticated, (req, res) => {
    res.render('livestream.ejs')
  })

  
  app.get('/join', checkAuthenticated, (req, res) => {
    res.render('join.ejs')
  })

  app.listen(PORT, function() {
    console.log('server running at port 5000');
  });
