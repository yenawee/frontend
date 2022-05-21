import React, { useCallback } from 'react';
import Xbtn from '@img/xmark-solid.svg';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import ActionModalShow from '@recoil/Review/ActionModalShow';
import '@css/Review/ActionModal.scss';
import axios from 'axios';
import getAddress from '@globalObj/func/getAddress';
import { getToken } from '@cert/TokenStorage';
import errorAlert from '@utils/errorAlert';
import GetBoards from '@globalObj/func/getBoards';
import SelectedEvent from '@recoil/SelectedEvent';
import BoardsObj from '@recoil/Review/BoardsObj';
import EditPostingModalShow from '@recoil/Review/EditPostingModalShow';
import { ReviewBoardType } from '@usefulObj/types';
import getDetailBoard from '@globalObj/func/getDetailBoard';

function ActionModal(props: {
  mode: string;
  boardId?: number;
  commentId?: number;
  setBoardObj?: React.Dispatch<React.SetStateAction<ReviewBoardType>>;
}) {
  const { mode, boardId, commentId, setBoardObj } = props;
  const setActionModalShow = useSetRecoilState(ActionModalShow);
  const selectedEvent = useRecoilValue(SelectedEvent);
  const setBoardsObj = useSetRecoilState(BoardsObj);
  const setEditPostingModalShow = useSetRecoilState(EditPostingModalShow);

  const deletePost = useCallback(() => {
    if (getToken()) {
      axios
        .delete(`${getAddress()}/api/board/${boardId}`, {
          headers: {
            Authorization: 'Bearer ' + getToken(),
          },
        })
        .then(() => {
          alert('삭제되었습니다');
          GetBoards(selectedEvent['id'], setBoardsObj);
          setActionModalShow(false);
        })
        .catch((err) => errorAlert(err));
    } else alert('로그인을 하셔야 삭제 가능합니다');
  }, [boardId, selectedEvent, setActionModalShow, setBoardsObj]);

  const deleteComment = useCallback(() => {
    if (getToken()) {
      axios
        .delete(`${getAddress()}/api/board/comment/${commentId}`, {
          headers: {
            Authorization: 'Bearer ' + getToken(),
          },
        })
        .then(() => {
          alert('삭제되었습니다');
          getDetailBoard(boardId, setBoardObj);
          setActionModalShow(false);
        })
        .catch((err) => errorAlert(err));
    } else alert('로그인을 하셔야 삭제 가능합니다');
  }, [boardId, commentId, setActionModalShow, setBoardObj]);

  const onClickUpdate = () => {
    setEditPostingModalShow(true);
    setActionModalShow(false);
  };

  const onClickDelete = () => {
    if (mode === 'post') deletePost();
    else if (mode === 'comment') deleteComment();
  };

  const onClickXbtn = () => {
    setActionModalShow(false);
  };

  // console.log(commentId);

  return (
    <div
      className="review--actionModal--background"
      onClick={() => {
        setActionModalShow(false);
      }}
    >
      <div className="review--actionModal" onClick={(e) => e.stopPropagation()}>
        <div className="review--actionModal--edit" onClick={onClickUpdate}>
          {mode === 'post' ? '게시글 수정' : '댓글 수정'}
        </div>
        <hr className="review--actionModal--hr" />
        <div className="review--actionModal--delete" onClick={onClickDelete}>
          {mode === 'post' ? '게시글 삭제' : '댓글 삭제'}
        </div>
        <hr className="review--actionModal--hr" />
        <div className="review--actionModal--xbtn">
          <img src={Xbtn} alt={Xbtn} onClick={onClickXbtn} />
        </div>
      </div>
    </div>
  );
}

export default ActionModal;