export function login(req,res){
    const {username,role}=req.body;
    req.session.user={username,role};
    let cookieCart=[];
    if(req.cookies.borrowCart){
        try{
            cookieCart=JSON.parse(req.cookies.borrowCart);
        }
        catch(err){
            cookieCart=[];
        }
    }
    req.session.borrowCart=cookieCart;
    res.clearCookie("borrowCart");
    res.json({
        code:200,
        message:"Login successful",
        session:req.session
    });
}