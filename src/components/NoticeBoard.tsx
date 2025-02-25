import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { noticeService, Notice } from '../services/noticeService';
// 样式组件
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin: 0 0 24px 0;
  color: #2c3e50;
  font-size: 28px;
`;

const CreateButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 15px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #45a049;
  }
`;

const SearchSection = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  margin: 20px 0;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const SearchLabel = styled.label`
  font-size: 14px;
  color: #495057;
  margin-bottom: 8px;
  display: block;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #80bdff;
    box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

const DateFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 20px;
`;

const DateFilterGroup = styled.div`
  flex: 1;
`;

const SelectGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 8px;
`;

const DateSelect = styled.select`
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
  flex: 1;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #80bdff;
    box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
  }
`;

const NoticeItem = styled.div`
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 20px;
  transition: box-shadow 0.2s;
  background-color: #ffffff;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  h2 {
    margin: 0 0 16px 0;
    padding-bottom: 16px;
    border-bottom: 1px solid #dee2e6;
    color: #2c3e50;
    font-size: 20px;
  }

  p {
    margin: 0;
    padding: 16px 0;
    white-space: pre-wrap;
    word-break: break-word;
    line-height: 1.6;
    color: #34495e;
  }
`;

const NoticeItemMeta = styled.div`
  color: #6c757d;
  font-size: 0.9em;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #dee2e6;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const DateInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  line-height: 1.4;
`;

const NoticeItemActions = styled.div`
  display: flex;
  gap: 10px;
`;

const EditButton = styled.button`
  background-color: #17a2b8;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #138496;
  }
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c82333;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #80bdff;
    box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  min-height: 120px;
  font-size: 14px;
  resize: vertical;
  transition: border-color 0.2s;
  white-space: pre-wrap;
  word-break: break-word;

  &:focus {
    outline: none;
    border-color: #80bdff;
    box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;

const SaveButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #218838;
  }
`;

const CancelButton = styled.button`
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #5a6268;
  }
`;

const ArrowIcon = styled.span`
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 12px solid white;
`;

interface ScrollButtonProps {
  $visible: boolean;
}

const ScrollToTopButton = styled.button<ScrollButtonProps>`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(108, 117, 125, 0.8);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  opacity: ${props => props.$visible ? '1' : '0'};
  pointer-events: ${props => props.$visible ? 'auto' : 'none'};
  z-index: 999;
  
  &:hover {
    background-color: rgba(73, 80, 87, 0.9);
    transform: translateY(-2px);
  }
`;

export const NoticeBoard: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // 添加年月日的选项数组
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // 添加筛选状态
  const [createdFilter, setCreatedFilter] = useState({
    year: '',
    month: '',
    day: ''
  });

  const [updatedFilter, setUpdatedFilter] = useState({
    year: '',
    month: '',
    day: ''
  });

  useEffect(() => {
    loadNotices();
    
    // 修改滚动判定距离
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadNotices = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await noticeService.getAllNotices();
      setNotices(data);
    } catch (error) {
      setError('データの読み込みに失敗しました。');
      console.error('Failed to load notices:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newNotice = await noticeService.createNotice({
        title,
        content,
        createdAt: new Date().toISOString()
      });
      
      setNotices(prev => [...prev, newNotice]);
      setShowForm(false);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Failed to create notice:', error);
    }
  };

  const deleteNotice = async (id: string) => {
    try {
      await noticeService.deleteNotice(id);
      await loadNotices();
    } catch (error) {
      console.error('Error deleting notice:', error);
    }
  };

  const editNotice = async (notice: Notice) => {
    try {
      await noticeService.updateNotice(notice.id, notice);
      await loadNotices();
    } catch (error) {
      console.error('Error updating notice:', error);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleEdit = (notice: Notice) => {
    setEditingNotice(notice);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('本当に削除しますか？')) {
      try {
        await noticeService.deleteNotice(id);
        setNotices(notices.filter(notice => notice.id !== id));
      } catch (error) {
        console.error('Failed to delete notice:', error);
      }
    }
  };

  return (
    <Container>
      <Title>掲示板</Title>

      <CreateButton onClick={() => setShowForm(true)}>
        新しい通知を作成
      </CreateButton>

      <SearchSection>
        <div>
          <SearchLabel>タイトル検索</SearchLabel>
          <SearchInput 
            type="text" 
            placeholder="タイトルのキーワードを入力"
          />
        </div>

        <DateFilterContainer>
          <DateFilterGroup>
            <SearchLabel>作成日で絞り込み</SearchLabel>
            <SelectGroup>
              <DateSelect 
                aria-label="作成年" 
                title="作成年"
                value={createdFilter.year}
                onChange={(e) => setCreatedFilter({
                  ...createdFilter,
                  year: e.target.value
                })}
              >
                <option value="">年</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}年</option>
                ))}
              </DateSelect>
              <DateSelect 
                aria-label="作成月"
                title="作成月"
                value={createdFilter.month}
                onChange={(e) => setCreatedFilter({
                  ...createdFilter,
                  month: e.target.value
                })}
              >
                <option value="">月</option>
                {months.map(month => (
                  <option key={month} value={month}>{month}月</option>
                ))}
              </DateSelect>
              <DateSelect 
                aria-label="作成日"
                title="作成日"
                value={createdFilter.day}
                onChange={(e) => setCreatedFilter({
                  ...createdFilter,
                  day: e.target.value
                })}
              >
                <option value="">日</option>
                {days.map(day => (
                  <option key={day} value={day}>{day}日</option>
                ))}
              </DateSelect>
            </SelectGroup>
          </DateFilterGroup>

          <DateFilterGroup>
            <SearchLabel>更新日で絞り込み</SearchLabel>
            <SelectGroup>
              <DateSelect 
                aria-label="更新年"
                title="更新年"
                value={updatedFilter.year}
                onChange={(e) => setUpdatedFilter({
                  ...updatedFilter,
                  year: e.target.value
                })}
              >
                <option value="">年</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}年</option>
                ))}
              </DateSelect>
              <DateSelect 
                aria-label="更新月"
                title="更新月"
                value={updatedFilter.month}
                onChange={(e) => setUpdatedFilter({
                  ...updatedFilter,
                  month: e.target.value
                })}
              >
                <option value="">月</option>
                {months.map(month => (
                  <option key={month} value={month}>{month}月</option>
                ))}
              </DateSelect>
              <DateSelect 
                aria-label="更新日"
                title="更新日"
                value={updatedFilter.day}
                onChange={(e) => setUpdatedFilter({
                  ...updatedFilter,
                  day: e.target.value
                })}
              >
                <option value="">日</option>
                {days.map(day => (
                  <option key={day} value={day}>{day}日</option>
                ))}
              </DateSelect>
            </SelectGroup>
          </DateFilterGroup>
        </DateFilterContainer>
      </SearchSection>

      {notices.map(notice => (
        <NoticeItem key={notice.id}>
          <h2>{notice.title}</h2>
          <p>{notice.content}</p>
          <NoticeItemMeta>
            <DateInfo>
              <div>作成: {new Date(notice.createdAt).toLocaleString('ja-JP')}</div>
              {notice.updatedAt && (
                <div>更新: {new Date(notice.updatedAt).toLocaleString('ja-JP')}</div>
              )}
            </DateInfo>
            <NoticeItemActions>
              <EditButton onClick={() => handleEdit(notice)}>
                編集
              </EditButton>
              <DeleteButton onClick={() => handleDelete(notice.id)}>
                削除
              </DeleteButton>
            </NoticeItemActions>
          </NoticeItemMeta>
        </NoticeItem>
      ))}

      {showForm && (
        <ModalOverlay>
          <ModalContent>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Input
                  type="text"
                  placeholder="タイトル"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <TextArea
                  placeholder="内容"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </FormGroup>
              <ButtonGroup>
                <CancelButton type="button" onClick={() => {
                  setShowForm(false);
                  setTitle('');
                  setContent('');
                }}>
                  キャンセル
                </CancelButton>
                <SaveButton type="submit">
                  保存
                </SaveButton>
              </ButtonGroup>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}

      <ScrollToTopButton 
        $visible={showScrollButton}
        onClick={scrollToTop}
        aria-label="トップへ戻る"
      >
        <ArrowIcon />
      </ScrollToTopButton>
    </Container>
  );
}; 