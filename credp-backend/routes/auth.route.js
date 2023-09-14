const express=require('express');
const axios=require('axios');
const router=express.Router();

router.get('/',async (req,res)=>{
    res.send(`
        <div style="margin: 300px auto;
        max-width: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: sans-serif;"
        >
            <h3>Welcome to CREDP</h3>
            <p>Click on the below button to get started!</p>
            <a 
                href="https://discord.com/api/oauth2/authorize?client_id=1141207851688275989&redirect_uri=https%3A%2F%2F8bcb-42-111-204-92.ngrok-free.app%2Fauth%2Fdiscord&response_type=code&scope=identify%20guilds%20guilds.join%20email%20guilds.members.read"
                style="outline: none;
                padding: 10px;
                border: none;
                font-size: 20px;
                margin-top: 20px;
                border-radius: 8px;
                background: #6D81CD;
                cursor:pointer;
                text-decoration: none;
                color: white;"
            >
            Login with Discord</a>
        </div>
    `)
})

router.get('/discord',async (req,res)=>{
    const code=req.query.code;
    const params = new URLSearchParams();
    let user;
    params.append('client_id', process.env.DISCORD_CLIENT_ID);
    params.append('client_secret', process.env.DISCORD_CLIENT_SECRET);
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', process.env.DISCORD_REDIRECT_URL);
    try{
        const response=await axios.post('https://discord.com/api/oauth2/token',params)
        const { access_token,token_type}=response.data;
        const userDataResponse=await axios.get('https://discord.com/api/users/@me',{
            headers:{
                authorization: `${token_type} ${access_token}`
            }
        })
        const guildsDataResponse=await axios.get('https://discord.com/api/users/@me/guilds',{
            headers:{
                authorization: `${token_type} ${access_token}`
            }
        })

        

        console.log('Data: ',userDataResponse.data)
        console.log('Guilds: ',guildsDataResponse.data)
        user={
            username:userDataResponse.data.username,
            email:userDataResponse.data.email,
            avatar:'https://cdn.discordapp.com/avatars/'+userDataResponse.data.id+'/'+userDataResponse.data.avatar+'.png',
            guild:guildsDataResponse.data.filter((guild)=>{
                return guild.id === '1140612817855184936'
            }
            )

        }
        const guildmemberinfo= await axios.get('https://discord.com/api/users/@me/guilds/'+user.guild[0].id+'/member',{
            headers:{
                authorization: `${token_type} ${access_token}`
            }
        })
        console.log('Guild Member Info: ',guildmemberinfo.data)
        return res.send(`
            <div style="margin: 300px auto;
            max-width: 400px;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: sans-serif;"
            >
                <h3>Welcome ${user.username}</h3>
                <span>Email: ${user.email}</span>
                <img src = "${user.avatar}">
                <h3>Guilds</h3>
                <ul>
                    <li>${user.guild[0].name}</li>
                    <img src = 'https://cdn.discordapp.com/icons/${user.guild[0].id}/${user.guild[0].icon}.png'>
                    <li>Permission Code : ${user.guild[0].permissions}</li>
                    <li> Guild role ID : ${guildmemberinfo.data.roles[0]}</li>
                    <li> Guild user name : ${guildmemberinfo.data.nick}</li>
                </ul>

                
            </div>
        `)
        
    }catch(error){
        console.log('Error',error)
        return res.send('Some error occurred! ')
    } 
})

module.exports = router;
