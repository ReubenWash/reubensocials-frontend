// PostGridItem.jsx

const PostGridItem = ({ postUrl, altText }) => {
    return (
        <div className="content-grid-item">
            <img src={postUrl} alt={altText} />
        </div>
    );
};

export default PostGridItem;