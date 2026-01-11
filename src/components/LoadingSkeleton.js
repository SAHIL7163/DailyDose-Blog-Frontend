import React from "react";

const LoadingSkeleton = ({ type }) => {
    if (type === "post") {
        return (
            <div className="card h-100" style={{ minHeight: "380px" }}>
                <div className="skeleton skeleton-image" />
                <div className="card-content">
                    <div className="card-meta">
                        <div className="skeleton" style={{ height: '14px', width: '30%' }} />
                        <div className="skeleton" style={{ height: '14px', width: '20%' }} />
                    </div>
                    <div className="skeleton skeleton-title" />
                    <div className="skeleton skeleton-text" />
                    <div className="skeleton skeleton-text" style={{ width: '90%' }} />
                    <div className="skeleton skeleton-text" style={{ width: '70%', marginBottom: 'var(--spacing-md)' }} />
                    <div className="card-footer">
                        <div className="skeleton skeleton-btn" />
                    </div>
                </div>
            </div>
        );
    }

    return <div className="skeleton" style={{ height: "100px", width: "100%", borderRadius: "8px" }} />;
};

export default LoadingSkeleton;

