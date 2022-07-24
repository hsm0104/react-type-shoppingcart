import { useState } from "react";
import { useQuery } from "react-query";
// components
import Item from "./Item/IItem";
import { Drawer, Progress, Col, Row, Badge } from 'antd';
import { ShoppingCartOutlined } from "@ant-design/icons";

//styles
import { Wrapper, StyledButton } from "./App.styles";

//types
export type CartItemType = {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
    description: string;
    amount: number; //added customed info
}

const getProducts = async(): Promise<CartItemType[]> => 
    await (await fetch('https://fakestoreapi.com/products')).json(); //await for json

const App = () => {
    //add Cart states
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([] as CartItemType[]);
    // add React Query fetching data
    const { data, isLoading, error } = useQuery(["products"],() => getProducts());

    console.log(data);

    //total amount of items
    const getTotalItems = (items: CartItemType[]) => 
        items.reduce((prev: number, item) => prev + item.amount, 0);
    const handleAddToCart = (clickedItem: CartItemType) => null;
    const handleRemoveFromCart = () => null;

    //when loading
    if(isLoading) return <Progress />
    //when error
    if(error) return <div>Something went wrong.....</div>

    return (
        <Wrapper>
            <Drawer placement="left"  width={500} visible={cartOpen} onClose={()=> setCartOpen(false)}>
                cart goes here
            </Drawer>
            <StyledButton onClick={() => setCartOpen(true)}>
                <Badge count={getTotalItems(cartItems)}>
                    <ShoppingCartOutlined />
                </Badge>
            </StyledButton>
            <Row gutter={[16, 16]}>
                {
                    data?.map((item:CartItemType) => (
                        <Col key={item.id} span={6}>
                            <Item item={item} handleAddToCart={handleAddToCart} />
                        </Col>
                    ))
                }
            </Row>
        </Wrapper>
    );
}

export default App;