const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


export default async (req,res) =>{
     const {items,email} = req.body;
    //  console.log(items);
    //  console.log(email);

//     const transformedItems = items.map(item=> ({
//         description:item.description,
//         quantity:1,
//         price_data:{
//             currency:'INR',
//             product_data:{
//                 name:item.title,
//                 images:[item.image]
//             },
//             unit_amount:item.price*100,
//         },

//     }));

//     const session = await stripe.checkout.sessions.create({
//         payment_method_types:["card"],
//         // shipping_options:[
//         //     {
//         //         shipping_rate:["shr_1NeP8HSG205GiZcoPISvIzTQ"],
//         //     },
//         // ],
//         shipping_address_collection:{
//             allowed_countries:['US','IN']
//         },
//         line_items:transformedItems,
//         mode:'payment',
//         success_url:`${process.env.HOST}/success`,
//         cancel_url:`${process.env.HOST}/checkout`,
//         metadata:{
//             email,
//             images: JSON.stringify(items.map(item=>item.image))
//         },
//     });

//     res.status(200).json({id:session.id})
// };

// Validate the items and price

 // Create a line item for each item
 const lineItems = items.map((item) => ({
    quantity: 1,
    price_data: {
       currency: "inr",
       unit_amount: item.price * 1000,
       product_data: {
          name: item.title,
          images: [item.image],
          description: item.description,
       },
    },
 }))

 // Create the checkout session
 try {
    const session = await stripe.checkout.sessions.create({
       payment_method_types:["card"],
       line_items: lineItems,
       mode: "payment",
       success_url:`${process.env.HOST}/success`,
       cancel_url:`${process.env.HOST}/checkout`,
       metadata: {
          email,
          // address,
          images: JSON.stringify(items.map((item) => item.image)),
       },
    })

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'An error occurred while creating the checkout session.' });
  }
};

