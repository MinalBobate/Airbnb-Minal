const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    
    userType: String,
    userName: String,
    fName: String,
    mName: String,
    lName: String,
    fullName: String,
    email: String,
    password: String,
    Name: String,
    contactNumber: String,

    country: String,
    state:String,
    city: String,
    gender: String,
    profilePicture:   String,
    favourites: [Number],
    tokens: {
        type: String
    }
});




// mongoose hooks
userSchema.pre("save", function (next) {
    // adding full name to every new user's data
    if (this.isNew) {
       
        let fname = this.fName.trim().toLowerCase();
        this.fName = fname.charAt(0).toUpperCase() + fname.slice(1);

        if (this.mName !== undefined) {
            let mname = this.mName.trim().toLowerCase();
            this.mName = mname.charAt(0).toUpperCase() + mname.slice(1);
        }
        let lname = this.lName.trim().toLowerCase();
        this.lName = lname.charAt(0).toUpperCase() + lname.slice(1);

        if (this.mName !== undefined) {
            this.fullName = `${this.fName} ${this.mName} ${this.lName}`;
        } else {
            this.fullName = `${this.fName} ${this.lName}`;
        }
    }
    next();
});

userSchema.methods.generateAuthToken = async function () {
    try {
        console.log(this.email);
        // const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET_KEY);
        // this.tokens = this.tokens.concat({token: token});

        const token = jwt.sign({"email": this.email}, process.env.JWT_SECRET_KEY);
res.cooo
        await this.save();
        return token;
    } catch (error) {
        res.send("The error part" + error); 
        console.log("The error part" + error);
    }

}





// creating models
const User = mongoose.model("user", userSchema);


// export
module.exports = User;
