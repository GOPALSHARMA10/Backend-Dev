export function fine(req,res){
    const {membershipType,amount}=req.body;
    let discount=membershipType==="Gold"?0.15:0.05;
    let fineAmonut=amount-(amount*discount);
    res.json({
        code:200,
        message:"Fine calculated",
        fineAmount:fineAmonut
    });
}