import React, { useState, useEffect } from "react";
import axios from "../api/posts";
import useAuth from "../hooks/useAuth";
import { FiSend, FiTrash2, FiUser, FiMessageCircle } from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";

const Commentsection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");
  const { auth } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/posts/${postId}/comments`);
        setComments(response.data);
      } catch (err) {
        setError("Failed to fetch comments.");
      }
    };
    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    setIsSubmitting(true);
    try {
      const response = await axios.post(`/posts/${postId}/comments`, {
        username: auth?.user.username,
        content: newComment,
      });
      setComments(response.data);
      setNewComment("");
    } catch (err) {
      setError("Failed to add comment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      const response = await axios.delete(
        `/posts/${postId}/comments/${commentId}`
      );
      setComments(response.data.comments);
    } catch (err) {
      setError("Failed to delete comment.");
    }
  };

  return (
    <div style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: '2rem 1rem'
    }}>
      {/* Section Header */}
      <div style={{
        marginBottom: '2rem',
        paddingBottom: '1rem',
        borderBottom: '2px solid var(--border-color)'
      }}>
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.5rem',
          fontWeight: '700',
          color: 'var(--text-primary)',
          marginBottom: '0.25rem'
        }}>
          Discussion
        </h3>
        <p style={{
          color: 'var(--text-muted)',
          fontSize: '0.875rem',
          margin: 0
        }}>
          {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
        </p>
      </div>

      {/* Input Area */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '3rem',
        alignItems: 'flex-start'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-hover))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          flexShrink: 0,
          fontSize: '1.25rem',
          fontWeight: '600',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
        }}>
          {auth?.user?.username ? auth.user.username.charAt(0).toUpperCase() : <FiUser size={22} />}
        </div>

        <div style={{ flexGrow: 1 }}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Join the discussion... Share your thoughts!"
            style={{
              width: '100%',
              minHeight: '120px',
              padding: '1rem',
              backgroundColor: 'var(--bg-secondary)',
              border: '2px solid var(--border-color)',
              borderRadius: '12px',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              lineHeight: '1.6',
              resize: 'vertical',
              transition: 'all 0.3s ease',
              outline: 'none'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--accent-primary)';
              e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border-color)';
              e.target.style.boxShadow = 'none';
            }}
          />
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '0.75rem'
          }}>
            <button
              onClick={handleAddComment}
              disabled={!newComment.trim() || isSubmitting}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 2rem',
                backgroundColor: newComment.trim() && !isSubmitting ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                color: newComment.trim() && !isSubmitting ? 'white' : 'var(--text-muted)',
                border: '2px solid',
                borderColor: newComment.trim() && !isSubmitting ? 'var(--accent-primary)' : 'var(--border-color)',
                borderRadius: '50px',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: newComment.trim() && !isSubmitting ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease',
                boxShadow: newComment.trim() && !isSubmitting ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none',
                opacity: newComment.trim() && !isSubmitting ? 1 : 0.6
              }}
              onMouseEnter={(e) => {
                if (newComment.trim() && !isSubmitting) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = newComment.trim() && !isSubmitting ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none';
              }}
            >
              {isSubmitting ? (
                <>
                  <span style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white',
                    borderRadius: '50%',
                    display: 'inline-block',
                    animation: 'spin 0.6s linear infinite'
                  }} />
                  Posting...
                </>
              ) : (
                <>
                  <FiSend size={18} />
                  Post Comment
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Comment List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {comments.map((comment) => (
          <div
            key={comment._id}
            style={{
              display: 'flex',
              gap: '1rem'
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--bg-secondary)',
              border: '2px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
              flexShrink: 0,
              fontSize: '1rem',
              fontWeight: '600'
            }}>
              {comment.username ? comment.username.charAt(0).toUpperCase() : <FiUser size={18} />}
            </div>

            <div style={{ flexGrow: 1 }}>
              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                padding: '1rem',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                transition: 'border-color 0.2s ease'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem'
                    }}>
                      {comment.username}
                    </span>
                    <span style={{ color: 'var(--text-muted)', opacity: 0.5 }}>•</span>
                    <span style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.8rem'
                    }}>
                      {comment.createdAt ? formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true }) : 'Just now'}
                    </span>
                  </div>

                  {comment.username === auth?.user?.username && (
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      title="Delete Comment"
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        borderRadius: '6px',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = 'var(--error)';
                        e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = 'var(--text-muted)';
                        e.target.style.backgroundColor = 'transparent';
                      }}
                    >
                      <FiTrash2 size={16} />
                    </button>
                  )}
                </div>
                <p style={{
                  margin: 0,
                  color: 'var(--text-secondary)',
                  fontSize: '0.95rem',
                  lineHeight: '1.6'
                }}>
                  {comment.content}
                </p>
              </div>
            </div>
          </div>
        ))}

        {comments.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '3rem 1rem',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '12px',
            border: '2px dashed var(--border-color)'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'var(--bg-primary)',
              border: '2px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              color: 'var(--text-muted)'
            }}>
              <FiMessageCircle size={28} />
            </div>
            <p style={{
              margin: 0,
              color: 'var(--text-muted)',
              fontSize: '1rem',
              fontWeight: '500'
            }}>
              No comments yet. Be the first to share your thoughts!
            </p>
          </div>
        )}
      </div>

      {/* Add keyframes for animations */}
      <style>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Commentsection;
