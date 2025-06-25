import ListCategory from '../block/ListCategory.js';
import ddibuType from '../asset/ddibu_type.js';

const Index = () => {
    return (
        <div>
            <p>하자. 교환.</p>
            <ListCategory data={ddibuType} />
        </div>
    )
};

export default Index;