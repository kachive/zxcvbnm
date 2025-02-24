import React, { useState } from 'react';
import styled from 'styled-components';

// 类型定义
interface Notice {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

// 样式组件
const BoardContainer = styled.div`
  min-height: 100vh;
  background-color: #f0f0f0;
  padding: 2rem;
`;

const Board = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const NoticeItem = styled.div`
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  h3 {
    margin: 0 0 1rem 0;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #eee;
  }

  p {
    margin: 0 0 1rem 0;
    line-height: 1.5;
  }

  small {
    color: #666;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
`;

const Form = styled.form`
  margin-bottom: 2rem;
  
  input, textarea {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  textarea {
    min-height: 100px;
  }
`;

const Button = styled.button`
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;

  &:hover {
    opacity: 0.9;
  }

  &.secondary {
    background-color: #757575;
  }

  &.edit {
    background-color: #2196F3;
  }

  &.delete {
    background-color: #f44336;
  }
`;

const AddButton = styled(Button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem 2rem;
  font-size: 1.1rem;
`;

export const NoticeBoard: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addNotice = (e: React.FormEvent) => {
    e.preventDefault();
    const newNotice: Notice = {
      id: Date.now().toString(),
      title: newTitle,
      content: newContent,
      createdAt: new Date().toISOString()
    };
    setNotices([...notices, newNotice]);
    setNewTitle('');
    setNewContent('');
    setIsModalOpen(false);
    // TODO: データベース保存
  };

  const deleteNotice = (id: string) => {
    setNotices(notices.filter(notice => notice.id !== id));
    // TODO: データベース削除
  };

  const editNotice = (notice: Notice) => {
    setNotices(notices.map(n => n.id === notice.id ? notice : n));
    setEditingId(null);
    // TODO: データベース更新
  };

  return (
    <BoardContainer>
      <Board>
        <h1>掲示板</h1>
        
        {notices.map(notice => (
          <NoticeItem key={notice.id}>
            {editingId === notice.id ? (
              <Form onSubmit={(e) => {
                e.preventDefault();
                editNotice({
                  ...notice,
                  title: (e.target as any).title.value,
                  content: (e.target as any).content.value
                });
              }}>
                <input 
                  name="title" 
                  defaultValue={notice.title} 
                  required
                  placeholder="タイトル"
                />
                <textarea 
                  name="content" 
                  defaultValue={notice.content} 
                  required
                  placeholder="内容"
                />
                <Button type="submit">保存</Button>
                <Button type="button" className="secondary" onClick={() => setEditingId(null)}>キャンセル</Button>
              </Form>
            ) : (
              <>
                <h3>{notice.title}</h3>
                <p>{notice.content}</p>
                <small>{new Date(notice.createdAt).toLocaleString('ja-JP')}</small>
                <div style={{ marginTop: '1rem' }}>
                  <Button className="edit" onClick={() => setEditingId(notice.id)}>編集</Button>
                  <Button className="delete" onClick={() => deleteNotice(notice.id)}>削除</Button>
                </div>
              </>
            )}
          </NoticeItem>
        ))}
      </Board>

      <AddButton onClick={() => setIsModalOpen(true)}>
        新規作成
      </AddButton>

      {isModalOpen && (
        <Modal onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <h2>新しいお知らせ</h2>
            <Form onSubmit={addNotice}>
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="タイトル"
                required
              />
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="内容"
                required
              />
              <Button type="submit">追加</Button>
              <Button 
                type="button" 
                className="secondary"
                onClick={() => setIsModalOpen(false)}
              >
                キャンセル
              </Button>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </BoardContainer>
  );
}; 