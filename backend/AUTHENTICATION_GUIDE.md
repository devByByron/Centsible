# Step 2 & 3 Detailed Explanation

## 📧 Step 2: Email Utility (sendEmail.js)

### **What is it?**
The email utility is a **reusable function** that sends emails using the **Nodemailer** library. Think of it as a helper tool that you can use anywhere in your backend when you need to send an email.

### **Why do we need it?**
When users register, forget their password, or verify their account, you need to send them emails with OTP codes. Instead of writing the same email-sending code repeatedly, we create a utility function once and reuse it everywhere.

### **How does it work?**

#### 1. **Create a Transporter**
```javascript
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,        // Gmail SMTP server
  port: process.env.EMAIL_PORT,        // Port 587
  auth: {
    user: process.env.EMAIL_USER,      // Your email
    pass: process.env.EMAIL_PASSWORD   // Your app password
  }
});
```
**What this does:**
- Connects to Gmail's email server (SMTP)
- Uses your credentials from `.env` file
- Creates a "connection" to send emails through

**Analogy:** Think of this like logging into Gmail on your browser. The transporter is your login session that allows you to send emails.

#### 2. **Set Up Email Options**
```javascript
const mailOptions = {
  from: process.env.EMAIL_FROM,    // Who the email is from
  to: options.to,                  // Who to send it to
  subject: options.subject,        // Email subject line
  text: options.text,              // Plain text version
  html: options.html               // Fancy HTML version
};
```
**What this does:**
- Prepares the email content (recipient, subject, message body)
- Allows both plain text and HTML formatted emails

#### 3. **Send the Email**
```javascript
const info = await transporter.sendMail(mailOptions);
```
**What this does:**
- Actually sends the email through Gmail
- `await` means the code waits for the email to send before continuing
- Returns info about the sent email (message ID)

### **Example Usage**
When a user registers, you would call:
```javascript
await sendEmail({
  to: user.email,
  subject: 'Verify Your Account',
  html: `Your OTP is: ${otp}`
});
```

---

## 🔐 Step 3: Authentication Middleware (auth.js)

### **What is Middleware?**
Middleware is **code that runs before your route handler**. Think of it like a security guard at a building:
- The guard checks your ID before letting you in
- If your ID is invalid, you can't enter
- If your ID is valid, you proceed to your destination

### **Why do we need it?**
Not all routes should be accessible to everyone. For example:
- ✅ Anyone can register (public route)
- ✅ Anyone can login (public route)
- ❌ Only logged-in users can view their transactions (protected route)
- ❌ Only logged-in users can create transactions (protected route)

Middleware protects routes by checking if the user is authenticated.

### **JWT (JSON Web Tokens) - The Concept**

#### **What is a JWT?**
A JWT is like a **digital ID card** that proves you're logged in. When you login successfully, the server gives you a token. Every time you access a protected route, you show this token to prove you're logged in.

**Structure of a JWT:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiSm9obiBEb2UifQ.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U
```

This token has 3 parts (separated by dots):
1. **Header** - Encryption algorithm used
2. **Payload** - User info (like your ID)
3. **Signature** - Server's stamp to prove it's real

**Analogy:** Think of it like a concert ticket:
- The venue issues you a ticket
- You carry the ticket around
- When entering different areas, you show your ticket
- The staff verifies the ticket is real and not expired
- If real, they let you in

### **How does the protect middleware work?**

#### 1. **Extract the Token**
```javascript
if (
  req.headers.authorization &&
  req.headers.authorization.startsWith('Bearer')
) {
  token = req.headers.authorization.split(' ')[1];
}
```
**What this does:**
- Looks for a header called `Authorization`
- Expects format: `Bearer TOKEN_HERE`
- Extracts just the token part

**Example:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
                      ↑ extract this part
```

#### 2. **Check if Token Exists**
```javascript
if (!token) {
  return res.status(401).json({
    success: false,
    error: 'Not authorized to access this route'
  });
}
```
**What this does:**
- If no token found, returns error 401 (Unauthorized)
- The user is denied access

#### 3. **Verify the Token**
```javascript
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```
**What this does:**
- Uses a secret key to decode the token
- Checks if token hasn't been tampered with
- Checks if token hasn't expired
- If token is invalid or expired, throws an error

**Why the secret key?**
The secret key is like a signature. Only the server knows it. If someone tries to forge a token, they won't know the secret key, so the verification will fail.

#### 4. **Get User from Database**
```javascript
req.user = await User.findById(decoded.id);
```
**What this does:**
- Extracts the user ID from the token
- Fetches the user from MongoDB
- Stores user info in `req.user` for use in route handlers

#### 5. **Verify User Exists and is Verified**
```javascript
if (!req.user) {
  return res.status(401).json({
    success: false,
    error: 'User no longer exists'
  });
}

if (!req.user.isVerified) {
  return res.status(401).json({
    success: false,
    error: 'Please verify your email first'
  });
}
```
**What this does:**
- Checks if user still exists (wasn't deleted)
- Checks if user verified their email
- Denies access if either check fails

#### 6. **Allow Access**
```javascript
next(); // Continue to next middleware/route handler
```
**What this does:**
- Calls `next()` to pass control to the actual route handler
- Allows the request to continue

### **How to Use the Middleware**

In your routes, add `protect` before the handler:

```javascript
// UNPROTECTED route - anyone can access
router.post('/login', async (req, res) => {
  // login logic
});

// PROTECTED route - only logged-in users can access
router.get('/transactions', protect, async (req, res) => {
  // Only authenticated users reach here
  console.log(req.user); // User info available here
});
```

### **generateToken Function**

```javascript
exports.generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};
```

**What this does:**
- Creates a new JWT token
- Includes user ID in the token
- Token expires after time specified in `.env` (e.g., 7 days)
- Returns the token string

**When to use:**
- After user successfully registers and verifies email
- After user successfully logs in

---

## 🔄 How It All Works Together

### **Registration Flow**
```
1. User submits registration form
   ↓
2. Backend receives data
   ↓
3. Backend generates OTP
   ↓
4. Backend calls sendEmail() to email the OTP
   ↓
5. User checks email and gets OTP
```

### **Login Flow**
```
1. User submits email & password
   ↓
2. Backend verifies password is correct
   ↓
3. Backend calls generateToken() to create JWT
   ↓
4. Backend sends token to frontend
   ↓
5. Frontend stores token in localStorage
```

### **Protected Route Access Flow**
```
1. Frontend requests /api/transactions with token in header
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ↓
2. protect middleware intercepts request
   ↓
3. Middleware extracts token from header
   ↓
4. Middleware verifies token with secret key
   ↓
5. Middleware gets user from database
   ↓
6. Middleware calls next() to continue to route handler
   ↓
7. Route handler accesses req.user (user info)
   ↓
8. Return user's transactions
```

---

## 📝 Example: Complete Flow

### **Step-by-step scenario:**

**Day 1: User Registers**
```
1. User signs up: john@example.com, password: "secure123"
2. Backend creates User in MongoDB
3. Backend generates OTP: "123456"
4. Backend calls sendEmail() to email OTP to john@example.com
5. John receives email with OTP
```

**Day 1: User Verifies Email**
```
1. John enters OTP from email
2. Backend checks OTP matches and hasn't expired
3. Backend marks user as isVerified = true
4. Backend calls generateToken() to create JWT
5. Backend returns JWT to frontend
6. Frontend stores JWT in localStorage
```

**Day 1: User Logs In (Next Time)**
```
1. John logs in with email and password
2. Backend verifies password matches
3. Backend calls generateToken() to create new JWT
4. Backend returns JWT to frontend
5. Frontend stores JWT in localStorage
```

**Day 1: User Views Transactions**
```
1. Frontend makes request to GET /api/transactions
2. Frontend includes JWT in Authorization header
3. Backend's protect middleware extracts token
4. Middleware verifies token is valid
5. Middleware gets user from database
6. Middleware calls next() to continue
7. Route handler accesses req.user (knows it's John)
8. Route handler returns only John's transactions
9. Frontend receives data and displays it
```

---

## 🎯 Key Takeaways

| Concept | Purpose |
|---------|---------|
| **sendEmail.js** | Utility to send emails (OTP, password reset, etc.) |
| **Middleware** | Code that runs before route handlers to verify requests |
| **JWT Token** | Digital ID card proving user is logged in |
| **protect middleware** | Checks if user is authenticated before allowing access |
| **generateToken** | Creates a JWT token after successful login/registration |
| **req.user** | User info attached by middleware, available in route handlers |

---

## 💡 Common Questions

**Q: Is the token stored on the server?**
A: No! The token is just a string. The server sends it to the client (frontend), and the client stores it. When making requests, the client sends the token back. This is called "stateless" authentication.

**Q: What happens if someone tries to use a fake token?**
A: The `jwt.verify()` will fail because they don't know the secret key. The middleware will reject the request.

**Q: What happens if the token expires?**
A: The `jwt.verify()` will fail because the expiration date has passed. The user needs to log in again to get a new token.

**Q: Why send OTP instead of just login?**
A: It verifies the user actually owns the email address they provided. It also adds extra security.

