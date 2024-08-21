const mongoose=require('mongoose')

    const userSchema=new mongoose.Schema({
    name:String,
    password:String,
    email:String,
    age:String
    })
    const User=mongoose.model('User',userSchema)


    async function findbyname(name) {
        try{
            const user=await User.findOne({name})
            if(name="")
            {
                console.log("find user")
            }
            else
            {
                console.log("cant find the user")
            }
            
        }
        catch
        {
            console.log('cant go to procces');
        }
        
    }

    mongoose.connect('mongodb://localhost:27017/arman')
    .then(async()=>{
        console.log("connected to mongo")

async function FindUser() {
    
    try
    {
        const user=await User.find({name:'star'});
        console.log('find the user:',user[0]);
    }
    catch(err)
    {
        console.log('error')
    }
}
FindUser()

    })
    .catch(err=>console.log('cant connect to database '))

    